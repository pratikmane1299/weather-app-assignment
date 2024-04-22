import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 h-full lg:container lg:mx-auto">
      <div className="w-full h-full grid grid-cols-[300px_1fr]">
        <div className="bg-white w-full h-full border-r border-gray-200">
          <div className="flex flex-col h-full p-12">
            <div className="relative flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>

              <input placeholder="Search for places..." className="ml-3 flex-1 placeholder:text-gray-900" />

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-gray-100  w-full p-12">
          <div className="flex justify-between items-center">
            <ul className="flex items-center space-x-4">
              <li>
                <Link href={'?filter=today'} className="text-base font-medium text-gray-400">Today</Link>
              </li>
              <li>
                <Link href={'?filter=week'} className="text-base font-semibold text-gray-900 py-1.5 border-b-2 border-gray-900">Week</Link>
              </li>
            </ul>
            <div className="flex justify-between items-center space-x-5">
              <ul className="flex items-center space-x-3">
                <li>
                  <Link href={"?unit=celcius"} className="p-2 w-7 h-7 flex justify-center items-center rounded-full bg-gray-900 text-white ">
                    <sup>.</sup>{"C"}
                  </Link>
                </li>

                <li className="p-2 w-7 h-7 flex justify-center items-center rounded-full bg-white text-gray-900 ">
                  <Link href={"?unit=farhenheit"}>
                    <sup>.</sup>F
                  </Link>
                </li>
              </ul>

              <button className="rounded-md w-8 h-8 bg-red-500"></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mt-14">
            <div className="w-full h-44 rounded-lg bg-white"></div>
            <div className="w-full h-44 rounded-lg bg-white"></div>
            <div className="w-full h-44 rounded-lg bg-white"></div>
            <div className="w-full h-44 rounded-lg bg-white"></div>
            <div className="w-full h-44 rounded-lg bg-white"></div>
            <div className="w-full h-44 rounded-lg bg-white"></div>
            <div className="w-full h-44 rounded-lg bg-white"></div>
          </div>


          <div className="mt-9 ">
            <h6 className="mb-8 text-base font-semibold text-gray-900">Today's Highlights</h6>

            <ul className="grid grid-cols-3 gap-6">
              <li className="h-56 bg-white rounded-lg"></li>
              <li className="h-56 bg-white rounded-lg"></li>
              <li className="h-56 bg-white rounded-lg"></li>
              <li className="h-56 bg-white rounded-lg"></li>
              <li className="h-56 bg-white rounded-lg"></li>
              <li className="h-56 bg-white rounded-lg"></li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
