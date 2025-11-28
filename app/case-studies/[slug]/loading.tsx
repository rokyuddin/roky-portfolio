export default function CaseStudyLoading() {
  return (
    <div className="bg-background min-h-screen text-foreground">
      {/* Nav Skeleton */}
      <div className="h-20 border-b border-border" />
      
      {/* Hero Section Skeleton */}
      <section className="pt-32 pb-16 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
          {/* Back Button */}
          <div className="h-6 bg-muted rounded w-32" />
          
          {/* Title */}
          <div className="space-y-4">
            <div className="h-16 bg-muted rounded-lg w-3/4" />
            <div className="h-8 bg-muted rounded w-1/2" />
            <div className="h-6 bg-muted rounded-full w-32" />
          </div>
          
          {/* Meta Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-muted rounded" />
            ))}
          </div>
          
          {/* Hero Image */}
          <div className="aspect-video bg-muted rounded-lg" />
        </div>
      </section>

      {/* Content Sections Skeleton */}
      <div className="space-y-16 py-16">
        {[1, 2, 3, 4].map((i) => (
          <section key={i} className="px-6">
            <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
              <div className="h-10 bg-muted rounded w-1/3" />
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-5/6" />
                <div className="h-4 bg-muted rounded w-4/6" />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
