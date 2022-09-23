import {
  createTheme,
  styled,
  ThemeProvider as MuiThemeProvider
} from '@mui/material/styles'

interface Height {
  header: string
  mobileHeader: string
  footer: string
}
interface Width {
  sidebar: string
  maxContent: string
}

declare module '@mui/material/styles' {
  interface Theme {
    height: Height
    width: Width
  }
}

declare module '@mui/material/styles/createTheme' {
  interface ThemeOptions {
    height: Height
    width: Width
  }
  interface Theme {
    height: Height
    width: Width
  }
}
const FONTS = {
  title: 'sans-serif!important'
  // content: 'sans-serif'
}

export const theme = {
  palette: {
    primary: {
      light: '#ADDFB5',
      main: '#31B047',
      dark: '#129026',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#31B047',
      main: '#D4F3D8',
      dark: '#129026',
      contrastText: '#ffffff'
    },

    error: {
      main: '#FA0E0E',
      light: '#FA0E0E10'
    },
    warning: {
      main: '#F0B90B'
    },
    info: {
      main: '#F0B90B'
    },
    success: {
      main: '#31B047'
    },
    background: {
      default: '#F2F5FA',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#252525',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: '#F2F5FA'
    },
    action: {
      disabledOpacity: 0.8
    }
  },

  height: {
    header: '80px',
    mobileHeader: '51px',
    footer: '60px'
  },
  width: {
    sidebar: '250px',
    maxContent: '1440px',
    minContent: '300'
  },
  shape: {
    border: '1px solid',
    borderRadius: 10
  },
  spacing: (factor: number) => `${1 * factor}px`
  // gray: {
  //   main: '#333333',
  //   dark: '#262626',
  // },
}

export const override: any = {
  MuiBox: {
    defaultProps: {
      component: 'div'
    }
  },
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: theme.palette.background.default,
        fontSize: 16,
        overflow: 'auto!important',
        paddingRight: '0px!important'
      },
      'html, input, textarea, button, body': {
        fontFamily: FONTS.title,
        fontDisplay: 'fallback'
      },
      '@supports (font-variation-settings: normal)': {
        'html, input, textarea, button, body': {
          fontFamily: FONTS.title,
          fontDisplay: 'fallback'
        }
      }
    }
  },
  MuiButtonBase: {
    styleOverrides: {
      root: {
        fontSize: 16,
        fontWeight: 500,
        fontFamily: FONTS.title
      }
    }
  },
  MuiButton: {
    styleOverrides: {
      root: {
        fontFamily: FONTS.title,
        transition: '.3s',
        borderRadius: 0
      }
    }
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        fontFamily: FONTS.title,
        lineHeight: 1.2
      },
      body1: {
        fontSize: 14
      }
    }
  }
}

export const HideOnMobile = styled('div', {
  shouldForwardProp: () => true
})<{ breakpoint?: 'sm' | 'md' }>(({ theme, breakpoint }) => ({
  [theme.breakpoints.down(breakpoint ?? 'sm')]: {
    display: 'none'
  }
}))

export const ShowOnMobile = styled('div', {
  shouldForwardProp: () => true
})<{ breakpoint?: 'sm' | 'md' }>(({ theme, breakpoint }) => ({
  display: 'none',
  [theme.breakpoints.down(breakpoint ?? 'sm')]: {
    display: 'block'
  }
}))

export default createTheme({
  ...theme,
  components: {
    ...override
  }
})

export function ThemeProvider({ children, theme }: any) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
