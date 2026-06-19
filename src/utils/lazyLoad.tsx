import { lazy, Suspense, type ComponentType } from "react"
import PageLoader from "@/components/ui/PageLoader"

export function lazyPage(
  factory: () => Promise<{ default: ComponentType }>
) {
  const Component = lazy(factory)
  return function LazyPage() {
    return (
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    )
  }
}
