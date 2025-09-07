// quartz/components/FlexibleNavigation.tsx
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface NavigationLink {
  text: string
  link: string
  external?: boolean
}

interface FlexibleNavigationOptions {
  links: NavigationLink[]
  title?: string
  showTitle?: boolean
}

const defaultOptions: FlexibleNavigationOptions = {
  links: [],
  showTitle: false
}

export default ((userOpts?: Partial<FlexibleNavigationOptions>) => {
  const opts = { ...defaultOptions, ...userOpts }
  
  function FlexibleNavigation({ displayClass }: QuartzComponentProps) {
    const { links, title, showTitle } = opts

    return (
      <div class={`adaptive-nav ${displayClass ?? ""}`}>
        {showTitle && title && (
          <h3 class="nav-title">{title}</h3>
        )}
        <ul class="nav-list overflow">
          {links.map(item => (
            <li>
              <a 
                href={item.link} 
                class="internal"
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                {item.text}
                {item.external && <svg class="external-icon" viewBox="0 0 24 24"><path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"/></svg>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  FlexibleNavigation.css = `
/* Desktop: Vertical list (sidebar style) */
.adaptive-nav .nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.adaptive-nav .nav-title {
  margin-bottom: 0.5rem;
}

.adaptive-nav li a {
  text-decoration: none;
  color: var(--darkgray);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem;
}

.adaptive-nav li a:hover {
  color: var(--secondary);
}

.external-icon {
  width: 14px;
  height: 14px;
  fill: currentColor;
  opacity: 0.6;
}

.overflow {
  overflow-y: auto;
}

/* Mobile: Horizontal layout */
@media all and (max-width: 600px) {
  .adaptive-nav .nav-list {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
  
  .adaptive-nav .nav-title {
    text-align: center;
    margin-bottom: 0.75rem;
  }
  
  .adaptive-nav li a {
    padding: 0.5rem;
    border-radius: 4px;
    background: var(--lightgray);
    color: var(--dark);
    font-weight: 500;
  }
  
  .adaptive-nav li a:hover {
    background: var(--gray);
  }
}

/* Very small screens: Stack vertically but with mobile styling */
@media all and (max-width: 400px) {
  .adaptive-nav .nav-list {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  .adaptive-nav li a {
    width: 100%;
    max-width: 200px;
    text-align: center;
  }
}
`

  return FlexibleNavigation
}) satisfies QuartzComponentConstructor<FlexibleNavigationOptions>