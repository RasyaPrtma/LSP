import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './modules/layout/MainLayout'
import Home from './modules/layout/Home'
import { ArticleProvider } from './modules/articles/ArticleContext'
import ArticleLayout from './modules/layout/ArticleLayout'
import FormArticle from './modules/articles/FormArticle'
import { useAuth } from './modules/auth/AuthContext'

function App() {

  const {IsLogged} = useAuth()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ArticleProvider><MainLayout/></ArticleProvider>}>
            <Route path='/' element={<Home/>}/>
          </Route>
          {
            IsLogged ?  
            <Route path='article' element={<ArticleProvider><ArticleLayout/></ArticleProvider>}>
            <Route path='*' element={<Navigate to={"/article"}/>}/>
          </Route> : null
          }
          <Route path={"*"} element={<Navigate to={"/"}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
