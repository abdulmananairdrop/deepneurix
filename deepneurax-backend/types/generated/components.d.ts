import type { Schema, Struct } from '@strapi/strapi';

export interface AboutUsCoreValue extends Struct.ComponentSchema {
  collectionName: 'components_metrics_section_core_values';
  info: {
    description: 'A single core value for the Metrics Section';
    displayName: 'Core Value';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HeroBackgroundVideo extends Struct.ComponentSchema {
  collectionName: 'components_hero_background_videos';
  info: {
    description: 'Video for hero background with optional thumbnail';
    displayName: 'Background Video';
  };
  attributes: {
    duration: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<10>;
    thumbnail: Schema.Attribute.Media<'images'>;
    video: Schema.Attribute.Media<'videos'>;
    videoUrl: Schema.Attribute.String;
  };
}

export interface SphereShowcaseItem extends Struct.ComponentSchema {
  collectionName: 'components_sphere_showcase_items';
  info: {
    description: '';
    displayName: 'Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    link: Schema.Attribute.String;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about-us.core-value': AboutUsCoreValue;
      'hero.background-video': HeroBackgroundVideo;
      'sphere-showcase.item': SphereShowcaseItem;
    }
  }
}
