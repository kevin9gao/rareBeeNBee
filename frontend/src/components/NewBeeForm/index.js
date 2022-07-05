import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createBee } from "../../store/bees";
import './NewBeeForm.css';

const NewBeeForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState(true);
  const [sidebarImg, setSidebarImg] = useState('http://magarticles.magzter.com/articles/9340/217507/58ef23b4b6603/Rare-bees.jpg');

  const user = useSelector(state => state.session.user);
  const errors = useSelector(state => state.bees.errors);
  // console.log('errors useSelector in NewBeeForm: ', errors);

  useEffect(() => {
    if (imageUrl.length > 0) {
      if (imageUrl.toLowerCase().endsWith('.jpg') ||
            imageUrl.toLowerCase().endsWith('.jpeg') ||
            imageUrl.toLowerCase().endsWith('.png')) {
              setSidebarImg(imageUrl)
            }
    };
  }, [imageUrl])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      const error = ['You must be logged in to post a new bee.'];
      setValidationErrors([...validationErrors, ...error]);
      setHideErrors(false);
    }

    const payload = {
      name,
      address,
      city,
      state,
      country,
      price,
      imageUrl,
      userId: user.id
    };

    // console.log('handleSubmit(before): ', payload)

    let newBee = await dispatch(createBee(payload));
    // console.log('handleSubmit(after): ', newBee)
    // console.log('errors within handleSubmit: ', errors)

    if (newBee.id) {
      // console.log('handleSubmit(if newBee runs): ', newBee)
      history.push(`/bees/${newBee.id}`);
    } else {
      // console.log('got to else in NewBeeForm')
      setHideErrors(false);
    }
  }

  return (
    <div className="new-bee-main-container">
      <main>
        <div className='form-containers'>
          <div
            className="errors"
            hidden={hideErrors}
          >
            <ul>
              {errors && errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
          <form
            className="forms"
            onSubmit={handleSubmit}
          >
            <label>Name</label>
            <input
              type='text'
              onChange={e => setName(e.target.value)}
              value={name}
              placeholder='Name of Bee...'
            />
            <label>Street Name</label>
            <input
              type='text'
              onChange={e => setAddress(e.target.value)}
              value={address}
              placeholder='Street where this bee was spotted...'
            />
            <label>City</label>
            <input
              type='text'
              onChange={e => setCity(e.target.value)}
              value={city}
              placeholder='City of bee spotting...'
            />
            <label>State</label>
            <input
              type='text'
              onChange={e => setState(e.target.value)}
              value={state}
              placeholder='State of bee spotting...'
            />
            <label>Country</label>
            <input
              type='text'
              onChange={e => setCountry(e.target.value)}
              value={country}
              placeholder='Country of bee spotting...'
            />
            <label>Price</label>
            <input
              type='text'
              onChange={e => setPrice(e.target.value)}
              value={price}
              placeholder='Price for One Bee Catching Session...'
            />
            <label>Image Url</label>
            <input
              type='text'
              onChange={e => setImageUrl(e.target.value)}
              value={imageUrl}
              placeholder='Link to a picture of the bee...'
            />
            <button id='new-bee-submit'>Submit</button>
          </form>
        </div>
      </main>
      <aside className="sidebar">
        <div className="new-bee-sidebar-img">
          <img
            src={sidebarImg}
            id='sidebar-img'
            alt="sidebar-img"
          />
        </div>
      </aside>
    </div>
  );
}

export default NewBeeForm;
