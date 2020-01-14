# InstaPug

Es una aplicación que simula el funcionamiento del feed de una red social. Los datos que se muestran vienen desde una fake API que permite buscar por tags.

## Instalación

Clonar el directorio con:

`$ git clone https://github.com/fabianignaci/rrsstest.git`

Entrar a la carpeta y ejecutar:

`$ cd rrsstest`

`$ npm install`

En caso de problemas con axios o react-router-dom:

`$ npm install axios --save`
`$ npm install react-router-dom`

## Comandos NPM o Yarn

`$ npm run start` `$ yarn start` para ejecutar el proyecto.
`$ npm run build` `$ yarn build` para pasar a producción.

## Estructura del proyecto
+ /assets
	+ /static
		- comment-icon.png
		- facebook-icon.png
		- insta-logo.png
		- like-icon.png 
		- like-icon2
		- ok-comment-icon.png
		- share-icon.png
	+ /styles
		- Header.css
		- Home.css
		- Loader.css
		- Post.css
+ /components
	+ Error.jsx
	+ Header.jsx
	+ Loader.jsx
	+ Post.jsx
	+ PostList.jsx

+ /containers
	+ Home.jsx

+ /routes
	+ App.js

+ index.js

## Funcionamiento del sistema

### Containers
**Home**: Es un componente de Clase que actúa como página principal de la aplicación la cual se encarga de realizar la llamada GET al fake API por medio de Axios.

Llama al los siguientes componentes:
- Error: Se utiliza para mostrar mensajes de error.
- Header: Se utiliza para recibir el tag por medio de una función que es pasada por props.
- PostList: Se utiliza para hacer un .map por cada Object y enviar las props a **Post** para que las muestre en una Card.
- Loader: Se utiliza para mostrar momentos de carga.

**Código**:
```javascript
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      data: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  handleSearchTag = tag => {
    tag = tag.toLowerCase();
    this.fetchData(tag);
  };

  setComponentState(loading, error, data) {
    this.setState({
      loading,
      error: error || null,
      data: data || []
    });
  }

  fetchData = tag => {
    this.setComponentState(true, null);
    axios
      .get(`https://n161.tech/api/dummyapi/tag/${tag || "any"}/post`)
      .then(res => {
        this.setComponentState(false, null, res.data.data);
      })
      .catch(e => {
        this.setComponentState(false, e);
      });
  };

  render() {
    return (
      <>
        <Header handleSearchTag={this.handleSearchTag} />
        {this.state.loading && <Loader />}

        {!this.state.data.length && !this.state.loading && !this.state.error && (
          <Error
            styles='text-info'
            message='Tag not found: You can find by "any"(default),
        "picture",
        "text",
        "post",
        "interesting",
        "read",
        "something",
        "tag" and
        "common"'
          />
        )}

        {this.state.error && (
          <Error
            styles='text-danger h5'
            message='An error occurred on loading the feed'
          />
        )}

        <div className='container-fluid bg-custom-2 mt-5'>
          <div className='container bg-white'>
            <PostList data={this.state.data} />
          </div>
        </div>
      </>
    );
  }
}
```

###Componentes:

**Error** : Componente funcional que recibe "message" y "styles" por props

**Código**:
```javascript
const Error = props => {
  let styles = props.styles;
  return (
    <div
      className='container d-flex align-items-center justify-content-center'
      style={{ height: "80vh", overflow: "hidden" }}
    >
      <div className='row'>
        <div className='col text-center mt-5'>
          <strong>
            <p className={styles}>{props.message}</p>
          </strong>
        </div>
      </div>
    </div>
  );
};
```
**Header**: Componente funcional que recibe como prop una función que envía el value del input para buscar un tag. Los eventos onChange y onKeyUp del input llaman a la función. Se hace validación antes de enviar el tag.

**Código**:
```javascript
const Header = props => {
  const handleSearchTag = e => {
    if (e.target.value === "" && e.keyCode !== 8 && e.key !== "Enter")
      return props.handleSearchTag(e.target.value);
    if (e.key === "Enter" && e.target.value !== "" && e.keyCode !== 8)
      return props.handleSearchTag(e.target.value);
  };

  return (
    <nav className='navbar container-fluid navbar-light bg-light fixed-top down-line'>
      <div className='container justify-content-center'>
        <div className='row'>
          <div className='col-2 d-flex align-items-center'>
            <img style={{ maxHeight: "40px" }} src={instaLogo} alt='' />
          </div>
          <div className='col-9 d-flex align-items-center'>
            <form
              onSubmit={e => {
                e.preventDefault();
              }}
              className='form-inline ml-auto'
            >
              <input
                className='form-control mr-sm-2'
                type='search'
                placeholder='Search by tag'
                aria-label='Search'
                onKeyUp={handleSearchTag}
                onChange={handleSearchTag}
              />
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
```
**Loader**: Componente funcional que muestra un loader de carga.

**Código**:
```javascript
const Loader = () => (
  <div className='row'>
    <div className='col-12 loader-content'>
      <div className='lds-default'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
);}
```
**PostList**: Componente funcional que recibe en sus props la data listada por tag desde Home para ser enviada al componente **Post**.

**Código**:
```javascript
const PostList = props => {
  return (
    <div className='row'>
      {props.data.map(post => (
        <Post
          id={post.id}
          key={post.id}
          image={post.image}
          message={post.message}
          ownerFirstName={post.owner.firstName}
          ownerLastName={post.owner.lastName}
          ownerImage={post.owner.image}
          tags={post.tags}
        />
      ))}
    </div>
  );
};
```

**Post**: Componente funcional que recibe como props la data enviada desde el componente **PostList**. Se hace destructuring a props para tomar los valores que se necesitan para llenar la Card y mostrar los datos.

Para la interacción con los botones se usaron hooks para controlar el estado de input para comentarios, icono de like e icono de comentarios.

**Código**:
```javascript
const Post = props => {
  const [visibleInputComment, setVisibleInputComment] = React.useState(false);
  const [showLikeIcon, setShowLikeIcon] = React.useState(false);
  const [postedComment, setPostedComment] = React.useState(false);

  const {
    id,
    image,
    message,
    ownerFirstName,
    ownerLastName,
    ownerImage,
    tags
  } = props;

  const toggleLikeIcon = () => {
    if (showLikeIcon) {
      return <img className='action-icon mx-2' src={likeIconRed} alt='' />;
    } else {
      return <img className='action-icon mx-2' src={likeIcon} alt='' />;
    }
  };

  const toggleOkCommentIcon = () => {
    if (postedComment) {
      return <img className='action-icon mx-2' src={okCommentIcon} alt='' />;
    } else {
      return <img className='action-icon mx-2' src={commentIcon} alt='' />;
    }
  };

  const postComment = e => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.target.value = "";
      setVisibleInputComment(false);
      setPostedComment(true);
    }
  };

  return (
    <div className='col-12 col-md-8 offset-md-2 my-3 animated fadeIn slow'>
      <div className='card'>
        <div className='d-flex align-items-center'>
          <img className='my-3 mx-2 img-post' src={ownerImage} alt='' />
          <p className='my-auto'>
            {ownerFirstName} {ownerLastName}
          </p>
        </div>
        <div className='card-img-content'>
          <img src={image} className='card-img-top' alt='...' />
        </div>
        <div className='card-body'>
          <div className='mb-4'>
            <button
              type='button'
              className='p-0 btn-cleansed'
              onClick={() => {
                setShowLikeIcon(!showLikeIcon);
              }}
            >
              {toggleLikeIcon()}
            </button>
            <button
              type='button'
              className='p-0 btn-cleansed'
              onClick={() => {
                setVisibleInputComment(!visibleInputComment);

                if (!visibleInputComment) {
                  setTimeout(() => {
                    document.getElementById(id).focus();
                  }, 0);
                }
              }}
            >
              {toggleOkCommentIcon()}
            </button>
            <button
              type='button'
              className='p-0 btn-cleansed'
              id='dropdownMenuButton'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <img className='action-icon mx-2' src={shareIcon} alt='' />
            </button>
            <div className='dropdown-menu'>
              <button className='dropdown-item btn-cleansed'>
                <img className='ml-auto' src={facebookIcon} alt='' />
              </button>
            </div>
          </div>
          <div>
            <p className='card-text'>{message}</p>
          </div>
          <div className='mt-3'>
            {tags.map(tag => (
              <span key={tag} className='badge badge-info mr-1'>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className='mx-4 my-3'>
          {visibleInputComment && (
            <div>
              <input
                id={id}
                className='inputComment col-12'
                placeholder='Add comment...'
                type='text'
                onKeyPress={postComment}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
```


## Librerías usadas

- [React 16.12.0](https://es.reactjs.org/)
- [react-router-dom 5.1.2](https://www.npmjs.com/package/react-router-dom)
- [Bootstrap 4.4.1](https://getbootstrap.com/)
- [Animated Css 3.7.2](https://github.com/daneden/animate.css)
- [Axios 0.19.1](https://www.npmjs.com/package/axios)
- [Loader from loading.io ](https://loading.io/css/)

## Licencia

MIT
