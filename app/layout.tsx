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
        <div className="relative flex flex-col min-h-screen">
          <header className="w-full h-16 bg-white px-6 drop-shadow-md flex items-center">
            <a className="text-xl text-gray-900 font-extrabold">TDEE Calculator</a>
          </header>
          <main className="flex flex-1 bg-[#F5F5F5] items-center justify-center text-gray-900">
            {children}
          </main>
        </div>
      </body>
  </html>
)
}