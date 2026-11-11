import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Harsh Chaudhary — AI Engineer',
  description: 'AI Engineer building code-intelligence platforms, knowledge graphs, and evidence-grounded agentic workflows. Explore selected work, experience, and expertise.',
  openGraph: {title:'Harsh Chaudhary — AI Engineer',description:'Making complex systems understandable. Building AI that does useful work.',type:'website'},
  robots:{index:true,follow:true}, icons:{icon:'/icon.svg'},
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
