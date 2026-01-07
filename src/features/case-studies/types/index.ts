export interface CaseStudy {
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    heroImage: string;
    overview: {
        description: string;
        role: string;
        duration: string;
        team: string;
        liveUrl: string;
    };
    challenge: {
        title: string;
        description: string;
        problems: string[];
    };
    solution: {
        title: string;
        description: string;
        approach: string[];
    };
    features: {
        title: string;
        items: {
            name: string;
            description: string;
            icon: string;
        }[];
    };
    techStack: {
        frontend: string[];
        backend: string[];
        tools: string[];
    };
    results: {
        title: string;
        description: string;
        metrics: {
            label: string;
            value: string;
            description: string;
        }[];
    };
    gallery: {
        image: string;
        caption: string;
    }[];
    relatedProjects: string[];
}