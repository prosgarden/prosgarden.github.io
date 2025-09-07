import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.MobileOnly(
      Component.Explorer({
        title: "Site Explorer", 
        mobileComponents: [
          () => Component.FlexibleNavigation({
            title: "Navigation",
            showTitle: true,
            links: [
              { text: "Home", link: "/" },
              { text: "About", link: "/about" },
              { text: "GitHub", link: "https://github.com", external: true }
            ]
          }),
          () => Component.TableOfContents()
        ],
        
        // mobileComponentsPosition: "above"
      }),
      
    ),
    Component.PageTitle({
      logoPath: "/static/logo.png",
      logoSize: "large"
    }),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.DesktopOnly(Component.FlexibleNavigation({
    title: "",
    showTitle: true,
    links: [
      { text: "Home", link: "/" },
      { text: "About Me", link: "/about" },
      { text: "Posts", link: "https://github.com", external: true }
    ]
  })),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.Explorer()),
    Component.RecentNotes(),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
