const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

// You'll need to replace this with your actual JWT token after creating an admin account
// Get it from: Settings -> API Tokens -> Create new token (Full access for seeding)
const API_TOKEN = process.env.STRAPI_API_TOKEN || '';

const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
  },
});

const seedData = {
  hero: {
    title: 'Transform Your Business with AI',
    tagline: 'Leading AI Solutions Provider',
    description: 'We deliver cutting-edge artificial intelligence solutions that drive innovation, automate processes, and unlock new possibilities for businesses worldwide.',
    primaryButtonText: 'Get Started',
    primaryButtonLink: '#contact',
    secondaryButtonText: 'Learn More',
    secondaryButtonLink: '#services',
    overlayColor: 'rgba(0, 0, 0, 0.5)',
    titleColor: '#ffffff',
    textColor: '#f0f0f0',
    primaryButtonColor: '#3b82f6',
    secondaryButtonColor: '#10b981'
  },

  services: [
    {
      title: 'AI Consulting',
      icon: '🎯',
      description: 'Strategic guidance to integrate AI solutions into your business processes and achieve measurable outcomes.',
      link: '/services/ai-consulting',
      order: 1,
      cardBackgroundColor: '#ffffff',
      borderColor: '#3b82f6',
      titleColor: '#1f2937',
      textColor: '#6b7280'
    },
    {
      title: 'Machine Learning',
      icon: '🤖',
      description: 'Custom ML models designed to solve your specific business challenges with precision and scalability.',
      link: '/services/machine-learning',
      order: 2,
      cardBackgroundColor: '#ffffff',
      borderColor: '#8b5cf6',
      titleColor: '#1f2937',
      textColor: '#6b7280'
    },
    {
      title: 'Data Analytics',
      icon: '📊',
      description: 'Transform raw data into actionable insights with advanced analytics and visualization tools.',
      link: '/services/data-analytics',
      order: 3,
      cardBackgroundColor: '#ffffff',
      borderColor: '#10b981',
      titleColor: '#1f2937',
      textColor: '#6b7280'
    },
    {
      title: 'Computer Vision',
      icon: '👁️',
      description: 'Cutting-edge image and video analysis solutions for automation and enhanced decision-making.',
      link: '/services/computer-vision',
      order: 4,
      cardBackgroundColor: '#ffffff',
      borderColor: '#f59e0b',
      titleColor: '#1f2937',
      textColor: '#6b7280'
    }
  ],

  products: [
    {
      name: 'NeuraxAI Platform',
      icon: '⚡',
      description: 'End-to-end AI development platform with pre-built models and easy integration.',
      link: '/products/neuraxai',
      order: 1,
      cardBackgroundColor: '#f9fafb',
      borderColor: '#3b82f6',
      titleColor: '#1f2937',
      textColor: '#6b7280'
    },
    {
      name: 'AutoML Suite',
      icon: '🚀',
      description: 'Automated machine learning toolkit for rapid model development and deployment.',
      link: '/products/automl',
      order: 2,
      cardBackgroundColor: '#f9fafb',
      borderColor: '#8b5cf6',
      titleColor: '#1f2937',
      textColor: '#6b7280'
    },
    {
      name: 'DataViz Pro',
      icon: '📈',
      description: 'Advanced data visualization and business intelligence dashboard solution.',
      link: '/products/dataviz',
      order: 3,
      cardBackgroundColor: '#f9fafb',
      borderColor: '#10b981',
      titleColor: '#1f2937',
      textColor: '#6b7280'
    }
  ],

  features: [
    {
      title: 'Scalable Infrastructure',
      icon: '🔧',
      description: 'Cloud-native architecture that grows with your business needs.',
      order: 1,
      cardBackgroundColor: '#ffffff',
      borderColor: '#3b82f6',
      titleColor: '#1f2937',
      textColor: '#6b7280'
    },
    {
      title: 'Real-time Processing',
      icon: '⚡',
      description: 'Process and analyze data in real-time for immediate insights.',
      order: 2,
      cardBackgroundColor: '#ffffff',
      borderColor: '#8b5cf6',
      titleColor: '#1f2937',
      textColor: '#6b7280'
    },
    {
      title: 'Enterprise Security',
      icon: '🔒',
      description: 'Bank-level encryption and security protocols to protect your data.',
      order: 3,
      cardBackgroundColor: '#ffffff',
      borderColor: '#10b981',
      titleColor: '#1f2937',
      textColor: '#6b7280'
    },
    {
      title: '24/7 Support',
      icon: '💬',
      description: 'Round-the-clock technical support from our expert team.',
      order: 4,
      cardBackgroundColor: '#ffffff',
      borderColor: '#f59e0b',
      titleColor: '#1f2937',
      textColor: '#6b7280'
    }
  ],

  metrics: [
    {
      label: 'Projects Completed',
      value: 250,
      suffix: '+',
      icon: '✅',
      order: 1,
      sectionBackgroundColor: '#f9fafb',
      cardBackgroundColor: '#ffffff',
      borderColor: '#3b82f6',
      numberColor: '#3b82f6',
      labelColor: '#6b7280'
    },
    {
      label: 'Happy Clients',
      value: 150,
      suffix: '+',
      icon: '😊',
      order: 2,
      sectionBackgroundColor: '#f9fafb',
      cardBackgroundColor: '#ffffff',
      borderColor: '#10b981',
      numberColor: '#10b981',
      labelColor: '#6b7280'
    },
    {
      label: 'Team Members',
      value: 50,
      suffix: '+',
      icon: '👥',
      order: 3,
      sectionBackgroundColor: '#f9fafb',
      cardBackgroundColor: '#ffffff',
      borderColor: '#8b5cf6',
      numberColor: '#8b5cf6',
      labelColor: '#6b7280'
    },
    {
      label: 'Success Rate',
      value: 98,
      suffix: '%',
      icon: '🎯',
      order: 4,
      sectionBackgroundColor: '#f9fafb',
      cardBackgroundColor: '#ffffff',
      borderColor: '#f59e0b',
      numberColor: '#f59e0b',
      labelColor: '#6b7280'
    }
  ],

  caseStudies: [
    {
      title: 'E-commerce Revenue Boost',
      description: 'Implemented AI-powered recommendation system for a major online retailer.',
      metrics: [
        { label: 'Revenue Increase', value: '45%' },
        { label: 'Customer Engagement', value: '60%' }
      ],
      link: '/case-studies/ecommerce',
      order: 1
    },
    {
      title: 'Healthcare Diagnostics',
      description: 'Developed ML model for early disease detection with 95% accuracy.',
      metrics: [
        { label: 'Accuracy', value: '95%' },
        { label: 'Time Saved', value: '70%' }
      ],
      link: '/case-studies/healthcare',
      order: 2
    },
    {
      title: 'Manufacturing Optimization',
      description: 'Automated quality control system reducing defects by 80%.',
      metrics: [
        { label: 'Defect Reduction', value: '80%' },
        { label: 'Cost Savings', value: '$2M' }
      ],
      link: '/case-studies/manufacturing',
      order: 3
    }
  ],

  testimonials: [
    {
      text: 'DeepNeurax transformed our business with their innovative AI solutions. The results exceeded our expectations!',
      author: 'Sarah Johnson',
      role: 'CTO, TechCorp Inc.',
      order: 1
    },
    {
      text: 'Outstanding expertise and professionalism. They delivered a complex ML project on time and within budget.',
      author: 'Michael Chen',
      role: 'VP of Engineering, DataFlow',
      order: 2
    },
    {
      text: 'The team at DeepNeurax is truly world-class. Their AI solutions have given us a significant competitive advantage.',
      author: 'Emily Rodriguez',
      role: 'CEO, InnovateLabs',
      order: 3
    }
  ],

  blogPosts: [
    {
      title: 'The Future of AI in Business',
      slug: 'future-of-ai-in-business',
      publishedAt: new Date('2025-12-01'),
      excerpt: 'Explore how artificial intelligence is reshaping the business landscape and what it means for your company.',
      tags: ['AI', 'Business', 'Technology'],
      content: '# The Future of AI in Business\n\nArtificial Intelligence is no longer a futuristic concept—it\'s here, and it\'s transforming how businesses operate.\n\n## Key Trends\n\n1. **Automation**: AI is automating repetitive tasks\n2. **Personalization**: Delivering customized experiences\n3. **Predictive Analytics**: Forecasting trends and behaviors\n\n## Conclusion\n\nBusinesses that embrace AI today will lead tomorrow.',
      author: 'Dr. Alex Thompson'
    },
    {
      title: 'Getting Started with Machine Learning',
      slug: 'getting-started-with-machine-learning',
      publishedAt: new Date('2025-11-15'),
      excerpt: 'A beginner-friendly guide to understanding machine learning concepts and applications.',
      tags: ['Machine Learning', 'Tutorial', 'Beginners'],
      content: '# Getting Started with Machine Learning\n\nMachine Learning can seem complex, but the fundamentals are accessible to everyone.\n\n## What is Machine Learning?\n\nMachine Learning is a subset of AI that enables systems to learn and improve from experience.\n\n## Types of ML\n\n- **Supervised Learning**: Learning from labeled data\n- **Unsupervised Learning**: Finding patterns in unlabeled data\n- **Reinforcement Learning**: Learning through trial and error',
      author: 'Dr. Alex Thompson'
    },
    {
      title: '5 Ways AI Can Transform Your Customer Service',
      slug: 'ai-transform-customer-service',
      publishedAt: new Date('2025-11-01'),
      excerpt: 'Discover how AI-powered tools can elevate your customer service experience.',
      tags: ['AI', 'Customer Service', 'Chatbots'],
      content: '# 5 Ways AI Can Transform Your Customer Service\n\n1. **24/7 Availability**: AI chatbots never sleep\n2. **Instant Responses**: No more waiting in queues\n3. **Personalization**: Tailored solutions for each customer\n4. **Multilingual Support**: Break language barriers\n5. **Data-Driven Insights**: Understand customer needs better',
      author: 'Jessica Lee'
    }
  ],

  cta: {
    title: 'Ready to Transform Your Business?',
    subtitle: 'Join hundreds of companies already leveraging AI to drive growth',
    buttonText: 'Get Started Today',
    buttonLink: '/contact'
  },

  footer: {
    companyDescription: 'DeepNeurax is a leading AI solutions provider, empowering businesses with cutting-edge artificial intelligence and machine learning technologies.',
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/deepneurax' },
      { platform: 'Twitter', url: 'https://twitter.com/deepneurax' },
      { platform: 'GitHub', url: 'https://github.com/deepneurax' },
      { platform: 'Facebook', url: 'https://facebook.com/deepneurax' }
    ],
    contactEmail: 'info@deepneurax.com',
    contactPhone: '+1 (555) 123-4567',
    address: '123 AI Street, Tech Valley, CA 94000, USA',
    copyrightText: '© 2025 DeepNeurax Technologies. All rights reserved.'
  }
};

async function seedContent() {
  console.log('🌱 Starting to seed Strapi content...\n');

  try {
    // Check if we can connect
    console.log('🔍 Checking connection to Strapi...');
    await axios.get(`${STRAPI_URL}/_health`);
    console.log('✅ Connected to Strapi\n');

    if (!API_TOKEN) {
      console.log('⚠️  WARNING: No API_TOKEN found!');
      console.log('Please set STRAPI_API_TOKEN environment variable with a Full Access token');
      console.log('Get it from: Settings -> API Tokens -> Create new token (Full access)\n');
      console.log('You can still proceed to create content manually through the admin panel.\n');
      return;
    }

    // Seed Hero (Single Type)
    console.log('📝 Creating Hero...');
    await api.put('/hero', { data: seedData.hero });
    console.log('✅ Hero created\n');

    // Seed Services
    console.log('📝 Creating Services...');
    for (const service of seedData.services) {
      await api.post('/services', { data: service });
    }
    console.log(`✅ ${seedData.services.length} Services created\n`);

    // Seed Products
    console.log('📝 Creating Products...');
    for (const product of seedData.products) {
      await api.post('/products', { data: product });
    }
    console.log(`✅ ${seedData.products.length} Products created\n`);

    // Seed Features
    console.log('📝 Creating Features...');
    for (const feature of seedData.features) {
      await api.post('/features', { data: feature });
    }
    console.log(`✅ ${seedData.features.length} Features created\n`);

    // Seed Metrics
    console.log('📝 Creating Metrics...');
    for (const metric of seedData.metrics) {
      await api.post('/metrics', { data: metric });
    }
    console.log(`✅ ${seedData.metrics.length} Metrics created\n`);

    // Seed Case Studies
    console.log('📝 Creating Case Studies...');
    for (const caseStudy of seedData.caseStudies) {
      await api.post('/case-studies', { data: caseStudy });
    }
    console.log(`✅ ${seedData.caseStudies.length} Case Studies created\n`);

    // Seed Testimonials
    console.log('📝 Creating Testimonials...');
    for (const testimonial of seedData.testimonials) {
      await api.post('/testimonials', { data: testimonial });
    }
    console.log(`✅ ${seedData.testimonials.length} Testimonials created\n`);

    // Seed Blog Posts
    console.log('📝 Creating Blog Posts...');
    for (const post of seedData.blogPosts) {
      await api.post('/blog-posts', { data: post });
    }
    console.log(`✅ ${seedData.blogPosts.length} Blog Posts created\n`);

    // Seed CTA (Single Type)
    console.log('📝 Creating CTA...');
    await api.put('/cta', { data: seedData.cta });
    console.log('✅ CTA created\n');

    // Seed Footer (Single Type)
    console.log('📝 Creating Footer...');
    await api.put('/footer', { data: seedData.footer });
    console.log('✅ Footer created\n');

    console.log('🎉 All content seeded successfully!');
    console.log('\n📌 Next steps:');
    console.log('1. Go to Content Manager in Strapi admin');
    console.log('2. Publish all the created entries');
    console.log('3. Verify content appears on your Next.js frontend');

  } catch (error) {
    console.error('❌ Error seeding content:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('No response received. Is Strapi running?');
      console.error('Request URL:', error.config?.url);
    } else {
      console.error('Full error:', error);
    }
    console.log('\n💡 Make sure:');
    console.log('1. Strapi is running at http://localhost:1337');
    console.log('2. You have created an admin account');
    console.log('3. You have set the API_TOKEN environment variable');
    console.log('4. Public permissions are set (find, findOne) for all content types');
    process.exit(1);
  }
}

// Run the seeder
seedContent();
