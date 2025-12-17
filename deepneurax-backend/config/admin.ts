export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },

  // Preview configuration
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('CLIENT_URL', 'http://localhost:3000')],
      async handler(uid: string, { documentId, locale, status }: any) {
        try {
          const document = await (strapi as any).documents(uid).findOne({ documentId });
          const pathname = getPreviewPathname(uid, { locale, document });

          if (!pathname) {
            return null;
          }

          const clientUrl = env('CLIENT_URL', 'http://localhost:3000');
          return `${clientUrl}${pathname}`;
        } catch (error) {
          console.error('Preview handler error:', error);
          return null;
        }
      },
    },
  },
});

// Function to generate preview pathname based on content type and document
const getPreviewPathname = (uid: string, { locale, document }: any): string | null => {
  const { slug, title } = document;

  // Handle different content types with their specific URL patterns
  switch (uid) {
    // Hero section - preview at homepage
    case 'api::hero.hero':
      return '/';

    // Blog posts
    case 'api::blog-post.blog-post': {
      if (!slug) {
        return '/blog';
      }
      return `/blog/${slug}`;
    }

    // Case studies
    case 'api::case-study.case-study': {
      if (!slug) {
        return '/case-studies';
      }
      return `/case-studies/${slug}`;
    }

    // Footer - preview at homepage
    case 'api::footer.footer':
      return '/';

    // CTA section - preview at homepage
    case 'api::cta.cta':
      return '/';

    // Services, products, features, metrics, testimonials - no dedicated page
    case 'api::service.service':
    case 'api::product.product':
    case 'api::feature.feature':
    case 'api::metric.metric':
    case 'api::testimonial.testimonial':
      return '/'; // Preview on homepage where they appear

    default: {
      return null;
    }
  }
};
