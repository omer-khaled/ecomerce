import { ReactElement } from "react"
import Hero from "../components/Home/Hero"
import Data from "../components/Home/Data"
import Banner from "../components/Home/Banner"
import Features from "../components/Home/Features"

function Home():ReactElement {
  return (
    <>
        <Hero />
        <Features />
        <Data uri="/category/getCategories" name="Categories" />
        <Data uri="/company/getCompany" name="Companies" />
        <Banner/>
    </>
  )   
}

export default Home
