import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Flex } from 'next/font/google'

const roboto_flex = Roboto_Flex({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TDEE Calculator',
  description: 'Calculate your TDEE!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

return (
  <html lang="en">
      <body className={roboto_flex.className}>
          <div className="relative flex h-screen">
              <div className="flex flex-col flex-1">
                  <header className="w-full h-16 bg-white px-6 drop-shadow-md flex justify-between items-center">
                      <a className="text-xl text-gray-900 font-extrabold" href="/">TDEE Calculator</a>
                      <div className="flex items-center"></div>
                  </header>
                  <main className="flex flex-1 bg-[#F5F5F5] items-center justify-center text-black">
                      {children}
                  </main>
              </div>
          </div>
      </body>
  </html>
)
}