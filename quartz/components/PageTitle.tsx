import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

interface PageTitleOptions {
  logoPath?: string
  logoSize?: "small" | "medium" | "large"
}

export default ((opts?: PageTitleOptions) => {
  const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
    const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
    const baseDir = pathToRoot(fileData.slug!)
    const { logoPath, logoSize = "large" } = opts || {}

    const containerClasses = classNames(
      displayClass,
      "page-title",
      logoPath ? `logo-${logoSize}` : ""
    )

    return (
      <h2 class={containerClasses}>
        <a href={baseDir}>
          {logoPath ? (
            <img src={baseDir + logoPath} alt={title} class="site-logo" />
          ) : (
            title
          )}
        </a>
      </h2>
    )
  }

  PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--headerFont);
}

.page-title a {
  text-decoration: none;
  color: inherit;
}

.site-logo {
  object-fit: contain;
}

.logo-small .site-logo {
  width: 24px;
  height: 24px;
}

.logo-medium .site-logo {
  width: 32px;
  height: 32px;
}

.logo-large .site-logo {
  width: 250px;
  height: 160px;
}

@media (max-width: 768px) {
  .logo-large .site-logo {
    width: 90px;
    height: 48px;
  }
  
  .logo-medium .site-logo {
    width: 28px;
    height: 28px;
  }
  
  .logo-small .site-logo {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 480px) {
  .logo-large .site-logo {
    width: 90px;
    height: 48px;
  }
  
  .logo-medium .site-logo {
    width: 24px;
    height: 24px;
  }
  
  .logo-small .site-logo {
    width: 18px;
    height: 18px;
  }
}
`

  return PageTitle
}) satisfies QuartzComponentConstructor