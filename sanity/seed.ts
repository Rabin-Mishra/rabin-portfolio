import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'u6l38s23',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN
});

function createBlock(text: string, style = 'normal') {
  return {
    _key: crypto.randomUUID(),
    _type: 'block',
    style,
    children: [
      {
        _key: crypto.randomUUID(),
        _type: 'span',
        marks: [],
        text,
      },
    ],
  };
}

const postsContent = {
  post1: [
    createBlock("Dockerizing a Next.js Application: A Complete Guide", "h2"),
    createBlock("Introduction", "h3"),
    createBlock("In today's fast-paced development ecosystem, containerization has shifted from being a nice-to-have to an absolute necessity. As an IT engineer transitioning into DevOps, I've spent considerable time streamlining application deliveries. Docker provides an elegant solution to the classic 'it works on my machine' problem. By packaging the application code alongside its precise dependencies and runtime environment, we guarantee consistent behavior from local development all the way to production clusters."),
    createBlock("Next.js, with its powerful server-side rendering (SSR) and API routes, presents unique challenges when containerizing compared to a standard single-page application. This guide walks you through creating an optimized, production-ready Dockerfile for a Next.js 15 application."),
    createBlock("Why Containerize Next.js?", "h3"),
    createBlock("When deploying modern web frameworks, you want to ensure that your node version, package manager version, and environment variables are exactly what the framework expects. Next.js does a lot of heavy lifting under the hood, building a highly optimized `.next` directory. Without Docker, you risk OS-level differences impacting your build, particularly if you rely on native dependencies like image-optimizing libraries. Containers encapsulate everything, making it trivial to deploy your application to AWS ECS, Kubernetes, or any container-native hosting platform."),
    createBlock("The Multi-Stage Dockerfile", "h3"),
    createBlock("To keep our final image size as small as possible—which directly translates to faster deployments, lower bandwidth costs, and a reduced attack surface—we employ a multi-stage Docker build. We'll have three main stages: `deps` (for installing dependencies), `builder` (for compiling the Next.js app), and `runner` (the final lean image that actually serves the application)."),
    createBlock("Stage 1: Dependencies. We start with a lightweight Alpine Node.js image to install our packages. By locking versions with `package-lock.json` or `pnpm-lock.yaml`, we ensure consistent installs."),
    createBlock("Stage 2: Builder. In this stage, we copy the installed node_modules from the `deps` stage, pull in the rest of our application source code, and run `next build`. This generates the optimized output but leaves us with a lot of build-time baggage we don't need in production."),
    createBlock("Stage 3: Runner. This is the magic step. We start fresh with another lean Alpine image. We only copy the `public` folder, the `.next/standalone` directory (which Next.js can generate to slim down node_modules to the bare minimum), and the `.next/static` files. We run the application as a non-root user for security."),
    createBlock("Crucial Step: The .dockerignore File", "h3"),
    createBlock("Don't overlook the `.dockerignore` file! If you accidentally copy your local `node_modules` or `.next` folder into the build context, you'll slow down your build significantly and potentially introduce local OS binaries into a Linux container. Exclude `node_modules`, `.next`, `.git`, and `.env*` files to ensure a clean build context."),
    createBlock("Build and Run Commands", "h3"),
    createBlock("Building the image is straightforward: `docker build -t my-next-app:latest .`"),
    createBlock("Once built, you can spin it up locally: `docker run -p 3000:3000 -e NODE_ENV=production my-next-app:latest`"),
    createBlock("Common Pitfalls", "h3"),
    createBlock("The most common mistakes I see are failing to enable 'standalone' output in `next.config.js`, using root privileges in the final container, and forgetting to pass build-time environment variables. Make sure your `.env` variables are handled correctly during the build stage if your Next.js app needs them to statically generate pages. With these considerations, you will have a rock-solid, portable frontend service ready for your DevOps pipelines."),
    createBlock("Implementing this setup is the first step toward a robust CI/CD pipeline. Once containerized, your Next.js application can easily be integrated into a GitHub Actions workflow, pushed to an ECR registry, and deployed anywhere.")
  ],
  post2: [
    createBlock("Getting Started with Terraform on AWS", "h2"),
    createBlock("The Power of Infrastructure as Code", "h3"),
    createBlock("Infrastructure as Code (IaC) has revolutionized how we provision and manage cloud environments. In the past, spinning up servers, configuring networks, and attaching storage required clicking through tedious web consoles or writing brittle shell scripts. Terraform, a declarative IaC tool by HashiCorp, allows you to define your entire infrastructure structure as human-readable code. As a DevOps engineer, embracing Terraform gives you version control over your infrastructure, repeatability, and an audit trail of any changes made."),
    createBlock("Terraform uses HCL (HashiCorp Configuration Language), which is intuitive and declarative. You simply state 'I want an EC2 instance of this size in this subnet' and Terraform figures out the API calls to make it happen."),
    createBlock("Core Concepts: Init, Plan, Apply", "h3"),
    createBlock("The Terraform workflow centers around three primary commands. `terraform init` initializes your working directory, downloading the necessary provider plugins (like the AWS provider). `terraform plan` is a dry-run; it compares your code to the current state of your infrastructure and shows you exactly what it will create, modify, or destroy. Finally, `terraform apply` executes the plan and provisions the resources."),
    createBlock("Real HCL Example: Provisioning an EC2 Instance", "h3"),
    createBlock("Let's look at a practical example. We want to provision a basic EC2 instance on AWS. First, we define the provider block specifying our region. Next, we define a Security Group resource to allow SSH access. Finally, we define the `aws_instance` resource, linking it to the AMI ID of an Ubuntu image, setting the instance type to `t2.micro`, and attaching the Security Group we just created."),
    createBlock("By grouping these resources, Terraform understands the dependency grid—it knows to create the Security Group before it boots the EC2 instance so that the group can be attached during initialization."),
    createBlock("The Importance of Remote State", "h3"),
    createBlock("When you run Terraform, it stores a mapping of your code to the real-world resources in a `.tfstate` file. If you work alone, keeping this file locally is fine. But in a team, you need a single source of truth to avoid race conditions and corrupted infrastructure."),
    createBlock("This is where S3 remote state comes in. By configuring an S3 backend in Terraform, your state file is stored securely in an AWS S3 bucket. Furthermore, by attaching a DynamoDB table, you enable state locking. If two engineers try to run `terraform apply` at the same time, the DynamoDB lock ensures one waits for the other to finish, preventing catastrophic state corruption."),
    createBlock("Security Considerations", "h3"),
    createBlock("Keep your Terraform code secure. Never hardcode AWS API keys inside your `.tf` files. Use environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`), assume IAM roles, or use automated credential injection via your CI/CD pipeline. Additionally, keep your remote state files private and encrypted, as they can contain sensitive outputs and configurations."),
    createBlock("Once you master the basics of providing an EC2 instance, you can expand your Terraform knowledge to build entire VPCs, orchestrate Kubernetes clusters (EKS), and manage databases (RDS). It transforms infrastructure from a manual chore into automated software engineering.")
  ],
  post3: [
    createBlock("Linux Server Hardening for DevOps Engineers", "h2"),
    createBlock("Why Hardening Matters", "h3"),
    createBlock("As a DevOps professional, spinning up a Linux server is often the foundational step of any project. However, the moment an Ubuntu or CentOS server gets a public IP address, bots scan and attack it within minutes. Leaving a server with default configurations is like leaving the front door of your house wide open in a busy city. Server hardening is the process of minimizing a system's attack surface by securing its configurations, closing unnecessary ports, and enforcing strict access controls."),
    createBlock("Securing SSH: The First Line of Defense", "h3"),
    createBlock("The Secure Shell (SSH) protocol is how you access your Linux machines, making it the primary target for brute-force attacks. The very first step on a fresh server is to switch from password authentication to SSH key pairs. Generate a robust ED25519 or RSA key pair on your local machine and add the public key to the server's `~/.ssh/authorized_keys` file."),
    createBlock("Once key-based access is verified, immediately edit the `/etc/ssh/sshd_config` file. Set `PermitRootLogin no` to prevent direct root access. Set `PasswordAuthentication no` to disable passwords entirely. Restart the SSH service using `systemctl restart sshd`. These two changes alone eliminate 99% of brute-force threats."),
    createBlock("Firewall Rules with UFW", "h3"),
    createBlock("An Uncomplicated Firewall (UFW) provides an accessible interface to manage iptables. By default, your server should deny all incoming traffic and allow all outgoing traffic. Set this up with `ufw default deny incoming` and `ufw default allow outgoing`."),
    createBlock("Next, selectively punch holes for the services you need. Always start with SSH so you don't lock yourself out: `ufw allow ssh` (or specify an exact port if you've moved it). If you're running a web server, allow HTTP and HTTPS: `ufw allow 80/tcp` and `ufw allow 443/tcp`. Finally, enable the firewall with `ufw enable`."),
    createBlock("Mitigating Attacks with fail2ban", "h3"),
    createBlock("Even with tightened SSH configurations, log files can rapidly fill up with failed connection attempts from automated scanners, wasting CPU cycles and disk space. `fail2ban` mitigates this by dynamically altering firewall rules to ban IP addresses that exhibit malicious behaviors. After installing `fail2ban`, copy `jail.conf` to `jail.local` and configure it to monitor the SSH service. If an IP fails to authenticate multiple times within a set window, `fail2ban` automatically drops their packets at the firewall level for a specified duration."),
    createBlock("Automating Security Updates", "h3"),
    createBlock("No system remains secure if its software is outdated. Vulnerabilities are discovered daily, and attackers weaponize them quickly. On Ubuntu, the `unattended-upgrades` package handles automatically installing security patches. By configuring `/etc/apt/apt.conf.d/50unattended-upgrades`, you can ensure that critical security fixes are applied without any manual intervention, keeping your dependencies hardened against known Common Vulnerabilities and Exposures (CVEs)."),
    createBlock("A truly hardened server requires vigilance. Regularly inspect `/var/log/auth.log`, utilize intrusion detection tools like Snort OSSEC, and practice the principle of least privilege for every user account. Security is not a state; it's a continuous process integrated deeply into the DevOps philosophy.")
  ],
};

async function seed() {
  console.log('Starting clear and seed process...');

  try {
    const existingPosts = await client.fetch('*[_type == "post"]._id');
    const existingProjects = await client.fetch('*[_type == "project"]._id');
    const existingCategories = await client.fetch('*[_type == "category"]._id');
    const existingAuthors = await client.fetch('*[_type == "author"]._id');

    for (const id of [...existingPosts, ...existingProjects, ...existingCategories, ...existingAuthors]) {
      await client.delete(id);
      console.log(`Deleted document ${id}`);
    }

    console.log('Creating author...');
    const authorRes = await client.create({
      _type: 'author',
      name: 'Rabin Mishra',
      bio: [createBlock('IT Engineer and Aspiring DevOps Engineer building reliable cloud infrastructure.')]
    });
    console.log('Created author:', authorRes._id);

    console.log('Creating categories...');
    const catDevops = await client.create({ _type: 'category', title: 'DevOps', slug: { current: 'devops' }, color: 'blue-500' });
    const catAws = await client.create({ _type: 'category', title: 'AWS', slug: { current: 'aws' }, color: 'orange-500' });
    const catLinux = await client.create({ _type: 'category', title: 'Linux', slug: { current: 'linux' }, color: 'yellow-500' });
    const catTerraform = await client.create({ _type: 'category', title: 'Terraform', slug: { current: 'terraform' }, color: 'purple-500' });
    console.log('Created categories.');

    console.log('Creating projects...');
    const projects = [
      {
        _type: 'project',
        title: 'CI/CD Pipeline with GitHub Actions + Docker + AWS',
        slug: { current: 'cicd-pipeline-github-actions-docker-aws' },
        description: 'Automated build-test-deploy pipeline for a Node.js app using GitHub Actions workflows, Docker containers, AWS ECR for image registry, and EC2 for hosting. Includes branch protection and PR checks.',
        techStack: ['GitHub Actions', 'Docker', 'AWS EC2', 'AWS ECR', 'Node.js'],
        featured: true,
        order: 1,
      },
      {
        _type: 'project',
        title: 'AWS Infrastructure as Code with Terraform',
        slug: { current: 'aws-infrastructure-as-code-terraform' },
        description: 'Provisioned a complete AWS environment using Terraform modules — VPC with public/private subnets, EC2 instances, S3 buckets, and RDS PostgreSQL. Remote state stored in S3 with DynamoDB locking.',
        techStack: ['Terraform', 'AWS VPC', 'EC2', 'S3', 'RDS', 'HCL'],
        featured: true,
        order: 2,
      },
      {
        _type: 'project',
        title: 'Kubernetes Deployment with Helm Charts',
        slug: { current: 'kubernetes-deployment-helm-charts' },
        description: 'Deployed a multi-tier web application on a local k8s cluster using custom Helm charts. Configured HPA, ConfigMaps, Secrets, Ingress controller, and resource limits.',
        techStack: ['Kubernetes', 'Helm', 'Docker', 'YAML', 'kubectl'],
        featured: false,
        order: 3,
      },
      {
        _type: 'project',
        title: 'Linux Server Hardening & Prometheus Monitoring',
        slug: { current: 'linux-server-hardening-prometheus-monitoring' },
        description: 'Configured a production-style Ubuntu server — SSH key hardening, fail2ban brute-force protection, UFW rules, and a full Prometheus + Grafana observability stack for system metrics.',
        techStack: ['Linux', 'Prometheus', 'Grafana', 'Bash', 'UFW', 'fail2ban'],
        featured: true,
        order: 4,
      },
      {
        _type: 'project',
        title: 'Dockerized Full-Stack App with Nginx Reverse Proxy',
        slug: { current: 'dockerized-full-stack-app-nginx-reverse-proxy' },
        description: 'Containerized a full-stack app using Docker Compose with multi-stage builds, Nginx reverse proxy, environment-based config, and health checks for all services.',
        techStack: ['Docker', 'Docker Compose', 'React', 'Node.js', 'PostgreSQL', 'Nginx'],
        featured: false,
        order: 5,
      }
    ];

    for (const proj of projects) {
      await client.create(proj);
      console.log(`Created project: ${proj.title}`);
    }

    console.log('Creating posts...');
    const posts = [
      {
        _type: 'post',
        title: 'Dockerizing a Next.js Application: A Complete Guide',
        slug: { current: 'dockerizing-nextjs-application-complete-guide' },
        excerpt: 'A comprehensive guide on establishing an optimized, multi-stage Docker build process for Next.js applications, ensuring consistent deployments and minimal image sizes.',
        category: { _type: 'reference', _ref: catDevops._id },
        tags: ['docker', 'nextjs', 'containers', 'devops'],
        publishedAt: new Date().toISOString(),
        body: postsContent.post1,
        readTime: 4,
      },
      {
        _type: 'post',
        title: 'Getting Started with Terraform on AWS',
        slug: { current: 'getting-started-terraform-aws' },
        excerpt: 'Learn the fundamentals of Infrastructure as Code using Terraform. We cover creating basic AWS infrastructure, managing state safely, and writing declarative HCL.',
        category: { _type: 'reference', _ref: catTerraform._id },
        tags: ['terraform', 'aws', 'iac', 'cloud'],
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        body: postsContent.post2,
        readTime: 4,
      },
      {
        _type: 'post',
        title: 'Linux Server Hardening for DevOps Engineers',
        slug: { current: 'linux-server-hardening-devops-engineers' },
        excerpt: 'Essential security practices for production Ubuntu servers, exploring zero-trust principles, SSH configurations, firewall deployment, and automated updates.',
        category: { _type: 'reference', _ref: catLinux._id },
        tags: ['linux', 'security', 'devops', 'bash', 'server'],
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        body: postsContent.post3,
        readTime: 5,
      }
    ];

    for (const post of posts) {
      await client.create(post);
      console.log(`Created post: ${post.title}`);
    }

    console.log('Seeding completed successfully!');
  } catch (err) {
    console.error('Seeding failed:', err);
  }
}

seed();
