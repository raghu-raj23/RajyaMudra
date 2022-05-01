import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { UseWalletProvider } from "use-wallet";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import "@fontsource/roboto";
import "@fontsource/inter"

const theme = extendTheme({
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      {" "}
      <ChakraProvider theme={theme}>
        <UseWalletProvider
          chainId={4}
          connectors={{
            walletconnect: {
              rpcUrl:
                "https://rinkeby.infura.io/v3/19843606664e4670a7d74f673845bbc4",
            },
          }}>
          <NavBar />
          <Component {...pageProps} />
          <Footer />{" "}
        </UseWalletProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
