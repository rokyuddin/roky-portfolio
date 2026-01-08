import { defineField, defineType } from 'sanity'

export const profile = defineType({
    name: 'profile',
    title: 'Profile',
    type: 'document',
    fields: [
        defineField({
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alternative Text',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'socials',
            title: 'Social Links',
            type: 'object',
            fields: [
                defineField({ name: 'github', title: 'GitHub', type: 'url' }),
                defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
                defineField({ name: 'x', title: 'X', type: 'url' }),
            ]
        })
    ],
})
