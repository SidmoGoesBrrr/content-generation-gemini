"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen bg-cover bg-center overflow-hidden">
        <div className="absolute inset-0 animate-background blur-md" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/025/770/654/original/postmodern-abstract-background-neo-brutalism-contemporary-style-illustration-vector.jpg')",
          
         }} />
        <header className="relative z-10 w-full bg-black bg-opacity-50 text-stone-50 p-6 font-mono">
          <h1 className="text-4xl font-bold align-top items-center text-center">Welcome to Our Blog Generator</h1>
        </header>
        
        <main className="relative z-10 flex flex-col items-center justify-center p-24 text-center text-slate-800 bg-black bg-opacity-50 min-h-screen">
          <p className="mb-8 text-xl text-zinc-300">
            
            Easily generate high-quality blog posts for AIC RMP with just a click of a button.
            <br/>
            <br/>
            This will use the gemini API to generate the blog posts.
          </p>
          
          <Link href="/generate" passHref>
            <button
              className="h-12 border-black border-2 p-2.5 bg-[#55c3c8] hover:bg-[#449da4] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-md"
              >
              Generate Blogs
            </button>
          </Link>
        </main>
      </div>

    </>
  );
}
