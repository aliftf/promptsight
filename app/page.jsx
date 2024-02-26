import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="title-text text-center">
        Share & Discover
        <br className="max-md:hidden" />
        <span className="bg-orange-gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="description-text text-center">Promptsight is a platform to find inspiration and share AI prompts</p>

      <Feed />
      
    </section>
  )
}

export default Home