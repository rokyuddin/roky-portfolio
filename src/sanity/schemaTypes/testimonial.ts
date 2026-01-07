import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'quote',
            title: 'Quote',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
        }),
        defineField({
            name: 'company',
            title: 'Company',
            type: 'string',
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule) => Rule.min(1).max(5),
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'string',
            description: 'e.g., "October 2024"',
        }),
        defineField({
            name: 'image',
            title: 'Author Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],
})
