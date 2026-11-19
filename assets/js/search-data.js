// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "Peer-reviewed publications in computational chemistry and materials science.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-research",
          title: "research",
          description: "Computational approaches to reaction mechanisms, 2D materials, and metal-based catalysis.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Academic CV — education, research experience, publications, and skills.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-contact",
          title: "contact",
          description: "Get in touch, download my CV, or find me on academic profiles.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/contact/";
          },
        },{id: "news-successfully-defended-my-phd-thesis-on-dft-simulations-of-2d-catalysts-at-itq-upv-csic",
          title: 'Successfully defended my PhD thesis on DFT simulations of 2D catalysts at ITQ...',
          description: "",
          section: "News",},{id: "news-winter-2026-2027-joining-ens-de-lyon-as-a-postdoctoral-researcher-so-excited-to-tackle-new-challenges",
          title: 'Winter 2026/2027: Joining ENS de Lyon as a Postdoctoral Researcher! So excited to...',
          description: "",
          section: "News",},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/CV_Pablo_Garcia_Aznar.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%70%67%61%72%61%7A%6E@%69%74%71.%75%70%76.%65%73", "_blank");
        },
      },{
        id: 'social-scopus',
        title: 'Scopus',
        section: 'Socials',
        handler: () => {
          window.open("https://www.scopus.com/authid/detail.uri?authorId=57827672900", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0003-0586-0037", "_blank");
        },
      },{
        id: 'social-researchgate',
        title: 'ResearchGate',
        section: 'Socials',
        handler: () => {
          window.open("https://www.researchgate.net/profile/Pablo-Garcia-Aznar/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
