import React, { useEffect, useState } from 'react';
import ArticlesService from '../../service/articleService';
import ArticlesDTO from '../../DTO/ArticlesDTO/ArticlesDTO';
import APIArticlesDTO from '../../DTO/ArticlesDTO/APIArticlesDTO';
import UserService from '../../service/userService';
import './listStyle.css';
import "./header.css";
import UsersDTO from '../../DTO/UsersDTO/UsersDTO';
import APIUsersDTO from '../../DTO/UsersDTO/APIUsersDTO';

const Dashboard = () => {
  const [articles, setArticles] = useState<APIArticlesDTO[]>([]);
  const [postArticle, setPostArticle] = useState<ArticlesDTO>({title: '', content: '', author_id: 0,});
  const [updatedArticle, setUpdatedArticle] = useState<APIArticlesDTO>({id: 0, title: '', content: '', author_id: 0, created_at: '',})

  const blankUser: APIUsersDTO = {id: 0, username: '', password: '', created_at: ''};
  const [users, setUsers] = useState<APIUsersDTO[]>([]);
  const [activeUser, setActiveUser] = useState<APIUsersDTO>(blankUser);
  const [loginData, setLoginData] = useState<UsersDTO>({username: '', password: ''});
  const [signinData, setSigninData] = useState<UsersDTO>({username: '', password: ''});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isArticleChangeActive, setIsArticleChangeActive] = useState(false);
  const [isPostPageOpen, setIsPostPageOpen] = useState(false);
  const [isLogPageOpened, setIsLogPageOpened] = useState(false);
  const [isRegisterPageOpened, setIsRegisterPageOpened] = useState(false);

  const Articles = new ArticlesService;
  const Users = new UserService;

  useEffect(() => {
    getArticles();
  }, []);


  const handleLogin = async () => {
    try {
      console.log(loginData);
      const logedUser = users.find((logedUser) => logedUser.username === loginData.username && logedUser.password === loginData.password);
      if (logedUser) {
        setActiveUser(logedUser);
        setIsLogPageOpened(false);
        setIsAuthenticated(true);
        return logedUser; 
      }
    } catch(err) {
      console.log(err);
    }
  }

  const handleSignin = async () => {
    try {
      const user = users.find((user) => user.username === signinData.username);
      if (!user) { 
        const data = await Users.create(signinData);
        setActiveUser(data.data);
        console.log('Registered new account: ', activeUser);
        setIsRegisterPageOpened(false);
        setIsAuthenticated(true);
      } else console.log('UserAlreadyExists');
    } catch(err) {
      console.log(err);
    }
  }

  const handleLoginChange = (e: any) => {
    setLoginData({
        ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSigninChange = (e:any) => {
    setSigninData({
      ...signinData,
      [e.target.name]: e.target.value,
    })
  }

  const getUsers = async () => {
    try {
      const data = await Users.getAll();
      setUsers(data.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  
  useEffect(() => {
    getUsers();
  }, []);

  const getUsernameById = (authorId: number) => {
    const user = users.find((user) => user.id === authorId);
    return user ? user.username : '';
  };

  const getArticles = async () => {
    try {
      const data = await Articles.getAll();
      setArticles(data.data);
      setFilteredArticles(articles);
      return articles;
    } catch (error) {
      console.error(error);
    }
  };

  const createArticle = async () => {
    try {
      postArticle.author_id = activeUser.id;
      await Articles.create(postArticle);
      getArticles();
    } catch(err) {
      console.log(err);
    }
  }

  const handleEdit = (article: APIArticlesDTO ) => {
    setIsArticleChangeActive(true);
    setUpdatedArticle(article);
  }

  const editArticle = async (id: number) => {
    try {
      await Articles.updateById(id, updatedArticle)
      setIsArticleChangeActive(false);
      getArticles();
    } catch(err) {
      console.log(err);
    }
  }

  const handlePostCreateChange = (e: any) => {
    setPostArticle({
      ...postArticle,
      [e.target.name]: e.target.value,
    });
  }

  const handleEditChange = (e: any) => {
    setUpdatedArticle({
      ...updatedArticle,
      [e.target.name]: e.target.value,
      author_id: activeUser.id,
    })
  };

  const handleLogOut = () => {
    setActiveUser(blankUser);
    setIsAuthenticated(false);
  }

  const [searchInput, setSearchInput] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<APIArticlesDTO[]>([]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredArticles(filtered);
  };


  return (
    <div className='bodyContainer' onLoad={() => setFilteredArticles(articles)}>
      <div id="header">
          <h1 id="headerText">WebPedia</h1>
            {!isAuthenticated && 
              <div className="logedOutContainer">
                  <button onClick={() => {setIsRegisterPageOpened(true)}}> Register </button>
                  <button onClick={() => {setIsLogPageOpened(true)}}> Log in </button>
              </div>
            }{isAuthenticated &&
              <div className="logedInContainer">
                <p> {activeUser.username} </p>
                <div className='controls'>
                  <button onClick={() => {setIsPostPageOpen(true)}}> Post an article </button>
                  <button onClick={() => {handleLogOut()}}> Log out </button>
                </div>
              </div>
            }
      </div>
      {isRegisterPageOpened &&
        <div className='loginPage'>
            <h2>Sign in</h2>
            <div className='loginInput'>
              <input
                type="text"
                name='username'
                placeholder="Username"
                onChange={(e) => handleSigninChange(e)}
              />
              <input
                type="password"
                name='password'
                placeholder="Password"
                onChange={(e) => handleSigninChange(e)}
              />
            </div>
            <div className='controls'>
              <button onClick={() => handleSignin()}>Sign In</button>
              <button onClick={() => setIsRegisterPageOpened(false)}> Cancel </button> 
            </div>
            {isAuthenticated && <p>Account created successfully</p>}
        </div>
      }
      {isLogPageOpened &&
        <div className='loginPage'>
            <h2>Login</h2>
            <div className='loginInput'>
              <input
                type="text"
                name='username'
                placeholder="Username"
                onChange={(e) => handleLoginChange(e)}
              />
              <input
                type="password"
                name='password'
                placeholder="Password"
                onChange={(e) => handleLoginChange(e)}
              />
            </div>
            <div className='controls'>
              <button onClick={handleLogin}>Log In</button>
              <button onClick={() => setIsLogPageOpened(false)}> Cancel </button> 
            </div>
            {isAuthenticated && <p>Logged in successfully!</p>}
        </div>
      }{ isPostPageOpen &&
          <div className='postPage'>
          <h2>Create Article</h2>
            <div className='inputArticle'>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name='title'
                placeholder={postArticle.title}
                onChange={(e) => handlePostCreateChange(e)}
              />
            </div>
            <div className='inputArticle'>
              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                name='content'
                onChange={(e) => handlePostCreateChange(e)}
              >{postArticle.content}</textarea>
            </div>
            <div className='controls'>
              <button type="submit" onClick={() => createArticle()}>Create</button>
              <button onClick={() => setIsPostPageOpen(false)}> Cancel </button>
            </div>
          </div>
      }{ isArticleChangeActive &&
        <div className='postPage'>
          <h2>Create Article</h2>
            <div>
             <div className='inputArticle'>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name='title'
                  defaultValue={updatedArticle.title}
                  onChange={(e) => handleEditChange(e)}
                />
              </div>
            </div>
            <div>
              <div className='inputArticle'>
                <label htmlFor="content">Content:</label>
                <textarea
                  id="content"
                  name="content"
                  defaultValue={postArticle.content}
                  onChange={(e) => handleEditChange(e)}
                ></textarea>
              </div>
            </div>
            <div className='controls'>
              <button type="submit" onClick={() => editArticle(updatedArticle.id)}>Save</button>
              <button onClick={() => setIsArticleChangeActive(false)}> Cancel</button>
            </div>
          </div>}
            
      <div className='dashboard'>
          <div className='searchContainer'>
            <input
              type="text"
              placeholder="Search articles by title..."
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
        {filteredArticles.map((article) => (
          <div key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p id='authorName'>Author: {getUsernameById(article.author_id)}</p>
            {(activeUser.id === article.author_id) && 
              <button onClick={() => handleEdit(article)} > Edit article </button>
              }
          </div>
        ))}
      </div>
    </div>
  );};

export default Dashboard;