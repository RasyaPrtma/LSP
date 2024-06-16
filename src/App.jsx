import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './modules/layout/MainLayout'
import Home from './modules/layout/Home'
import { ArticleProvider } from './modules/articles/ArticleContext'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ArticleProvider><MainLayout/></ArticleProvider>}>
            <Route path='/' element={<Home/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
