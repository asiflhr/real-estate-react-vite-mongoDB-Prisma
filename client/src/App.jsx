import React, { Suspense } from 'react'
import './App.css'
import Website from './pages/Website'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Properties from './pages/Properties/Properties'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PuffLoader from 'react-spinners/PuffLoader'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className='wrapper flexCenter' style={{ height: '60vh' }}>
              <PuffLoader
                color='#4066ff'
                height={100}
                width={100}
                radius={1}
                aria-label='puff-loading'
              />
            </div>
          }
        >
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Website />} />
              <Route path='/properties' element={<Properties />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
