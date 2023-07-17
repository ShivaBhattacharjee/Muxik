import React from 'react'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <section className="flex items-center h-screen p-16 bg-[#2d1b69]  dark:text-gray-100">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center -translate-y-20">
			<h2 className="mb-8 font-extrabold text-9xl text-white">
				<span className="sr-only">Error</span>404
			</h2>
			<p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
			<p className="mt-4 mb-8 dark:text-gray-400">But dont worry, you can find plenty of other things on our homepage.</p>
			<Link to="/" rel="noopener noreferrer" href="#" className="px-8 py-3 font-semibold rounded-lg dark:bg-violet-400 dark:text-gray-900">Back to homepage</Link>
		</div>
	</div>
</section>
  )
}

export default PageNotFound