import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project (Home Model)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Model Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                layout: 'grid',
            },
        }),
        defineField({
            name: 'status',
            title: 'Project Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Available', value: 'available' },
                    { title: 'Sold', value: 'sold' },
                    { title: 'Model Home', value: 'model' },
                    { title: 'In Progress', value: 'in-progress' },
                ],
            },
        }),
        defineField({
            name: 'priceRange',
            title: 'Price Range',
            type: 'string',
            description: 'e.g. $800k - $1.2M',
        }),
        defineField({
            name: 'sqft',
            title: 'Square Footage',
            type: 'number',
        }),
        defineField({
            name: 'bedrooms',
            title: 'Bedrooms',
            type: 'number',
        }),
        defineField({
            name: 'bathrooms',
            title: 'Bathrooms',
            type: 'number',
        }),
        defineField({
            name: 'features',
            title: 'Key Features',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
        }),
    ],
})
