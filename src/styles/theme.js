import { extendTheme } from '@chakra-ui/react'
// import { createBreakpoints } from '@chakra-ui/theme-tools'
import { mode } from '@chakra-ui/theme-tools'

  const styles= {
    global: props => ({
      body: {
        bg: mode('#', '#')(props)
      }
    })
  }

  const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
  }

//   const breakpoints = createBreakpoints({
//     sm: "40em",
//     md: "52em",
//     lg: "64em",
//     lg: "62em",
//   })

  const components = {
    Heading: {
      variants: {
        'name-title': {
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 700,
        },

        'section-title': {
          fontFamily: 'Nunito Sans, sans-serif',
          fontWeight: 800,
          textDecoration: 'underline',
          fontSize: 20,
          textUnderlineOffset: 6,
          textDecorationColor: '#525252',
          textDecorationThickness: 4,
          marginBottom: 4,
        }
      }
    },
    Link: {
      baseStyle: props => ({
        color: mode('black', '#ff63c3')(props),
        textUnderlineOffset: 3,
        fontFamily: 'Noto Sans Mono, sans-serif',
        fontWeight: 500,
      }),

    }
  }

  const fontWeight= {
    normal: 300,
    medium: 600,
    bold: 900,
  }

  const fontSizes= {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
  }

  const fonts = {
    heading: 'var(----font-playfair)',
    body: 'var(--font-rubik)',
  }
// const customTheme = extendTheme({styles, config, breakpoints, overrides})

// export default customTheme

export default extendTheme({styles, config, components, fontWeight, fontSizes})