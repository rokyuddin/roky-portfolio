export default function CaseStudiesLoading() {
  return (
    <div className="bg-background min-h-screen text-foreground">
      {/* Nav Skeleton */}
      <div className="h-20 border-b border-border" />
      
      {/* Hero Section Skeleton */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 animate-pulse">
            <div className="h-16 bg-muted rounded-lg w-3/4" />
            <div className="h-6 bg-muted rounded-lg w-full" />
            <div className="h-6 bg-muted rounded-lg w-2/3" />
          </div>
        </div>
      </section>

      {/* Case Studies Grid Skeleton */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  {/* Image Skeleton */}
                  <div className="aspect-video bg-muted" />
                  
                  {/* Content Skeleton */}
                  <div className="p-6 space-y-4">
                    <div className="h-8 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-5/6" />
                      <div className="h-4 bg-muted rounded w-4/6" />
                    </div>
                    
                    {/* Tags Skeleton */}
                    <div className="flex gap-2">
                      <div className="h-6 bg-muted rounded-full w-16" />
                      <div className="h-6 bg-muted rounded-full w-20" />
                      <div className="h-6 bg-muted rounded-full w-24" />
                    </div>
                    
                    {/* Buttons Skeleton */}
                    <div className="flex justify-between pt-2">
                      <div className="h-10 bg-muted rounded w-32" />
                      <div className="h-10 bg-muted rounded w-24" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
