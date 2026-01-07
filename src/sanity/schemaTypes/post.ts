import { defineField, defineType } from 'sanity'

export const post = defineType({
    name: 'post',
    title: 'Blog Post',
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
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'markdown',
            description: 'Use Markdown for content',
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'object',
            fields: [
                defineField({ name: 'name', title: 'Name', type: 'string' }),
                defineField({ name: 'avatar', title: 'Avatar', type: 'string' }),
            ]
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'readTime',
            title: 'Read Time',
            type: 'string',
        })
    ],
})
