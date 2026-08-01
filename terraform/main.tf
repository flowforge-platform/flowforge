module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "flowforge-vpc"

  cidr = "10.0.0.0/16"

  azs = [
    "ap-south-1a",
    "ap-south-1b"
  ]

  private_subnets = [
    "10.0.1.0/24",
    "10.0.2.0/24"
  ]

  public_subnets = [
    "10.0.101.0/24",
    "10.0.102.0/24"
  ]

  enable_nat_gateway = true
  single_nat_gateway = true

  public_subnet_tags = {
    "kubernetes.io/role/elb" = "1"
  }

  private_subnet_tags = {
    "kubernetes.io/role/internal-elb" = "1"
  }
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 21.0"

  name               = var.cluster_name
  kubernetes_version = var.cluster_version

  endpoint_public_access = true

  enable_cluster_creator_admin_permissions = true

  enable_irsa = true

  vpc_id                   = module.vpc.vpc_id
  subnet_ids               = module.vpc.private_subnets
  control_plane_subnet_ids = module.vpc.private_subnets


  addons = {
    coredns = {
      most_recent = true
    }

    kube-proxy = {
      most_recent = true
    }

    vpc-cni = {
      before_compute = true
      most_recent    = true
    }

    eks-pod-identity-agent = {
      before_compute = true
      most_recent    = true
    }

    aws-ebs-csi-driver = {
      most_recent            = true
      service_account_role_arn = module.ebs_csi_irsa_role.iam_role_arn
    }
  }


  eks_managed_node_groups = {
    example = {
      ami_type       = "AL2023_x86_64_STANDARD"
      instance_types = ["m7i-flex.large"]

      min_size     = 2
      desired_size = 2
      max_size     = 3
    }
  }

  tags = {
    Environment = "dev"
    Terraform   = "true"
  }
}