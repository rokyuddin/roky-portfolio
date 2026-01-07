import { defineField, defineType } from 'sanity'

export const caseStudy = defineType({
    name: 'caseStudy',
    title: 'Case Study',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'overview',
            title: 'Overview',
            type: 'object',
            fields: [
                defineField({ name: 'description', title: 'Description', type: 'text' }),
                defineField({ name: 'role', title: 'Role', type: 'string' }),
                defineField({ name: 'duration', title: 'Duration', type: 'string' }),
                defineField({ name: 'team', title: 'Team', type: 'string' }),
                defineField({ name: 'liveUrl', title: 'Live URL', type: 'url' }),
            ]
        }),
        // Handling Challenge, Solution, Features, Tech Stack, Results via simple objects or just blocks for now.
        // Keeping it structured to match existing data.
        defineField({
            name: 'challenge',
            title: 'Challenge',
            type: 'object',
            fields: [
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text' }),
                defineField({ name: 'problems', title: 'Problems', type: 'array', of: [{ type: 'string' }] }),
            ]
        }),
        defineField({
            name: 'solution',
            title: 'Solution',
            type: 'object',
            fields: [
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text' }),
                defineField({ name: 'approach', title: 'Approach', type: 'array', of: [{ type: 'string' }] }),
            ]
        }),
        defineField({
            name: 'features',
            title: 'Key Features',
            type: 'object',
            fields: [
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({
                    name: 'items',
                    title: 'Items',
                    type: 'array',
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({ name: 'name', title: 'Name', type: 'string' }),
                            defineField({ name: 'description', title: 'Description', type: 'text' }),
                            defineField({ name: 'icon', title: 'Icon Name', type: 'string' }),
                        ]
                    }]
                }),
            ]
        }),
        defineField({
            name: 'techStack',
            title: 'Tech Stack',
            type: 'object',
            fields: [
                defineField({ name: 'frontend', title: 'Frontend', type: 'array', of: [{ type: 'string' }] }),
                defineField({ name: 'backend', title: 'Backend', type: 'array', of: [{ type: 'string' }] }),
                defineField({ name: 'tools', title: 'Tools', type: 'array', of: [{ type: 'string' }] }),
            ]
        }),
        defineField({
            name: 'results',
            title: 'Results',
            type: 'object',
            fields: [
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text' }),
                defineField({
                    name: 'metrics',
                    title: 'Metrics',
                    type: 'array',
                    of: [{
                        type: 'object',
                        fields: [
                            defineField({ name: 'label', title: 'Label', type: 'string' }),
                            defineField({ name: 'value', title: 'Value', type: 'string' }),
                            defineField({ name: 'description', title: 'Description', type: 'string' }),
                        ]
                    }]
                }),
            ]
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'image', title: 'Image', type: 'image' }),
                    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
                ]
            }]
        }),
        defineField({
            name: 'relatedProjects',
            title: 'Related Projects',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of slugs of related projects'
        })
    ],
})
