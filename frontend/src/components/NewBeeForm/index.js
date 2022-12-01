import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createBee } from "../../store/bees";
import './BeeForm.css';
import { addBeeImages } from "../../store/images";

const NewBeeForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [addImages, setAddImages] = useState(null);
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState(true);
  // const [shownImg, setShownImg] = useState(0);
  // const [previewURLs, setPreviewURLs] = useState('');
  const [sidebarImg, setSidebarImg] = useState('http://magarticles.magzter.com/articles/9340/217507/58ef23b4b6603/Rare-bees.jpg');

  const user = useSelector(state => state.session.user);

  useEffect(() => {
    const errors = [];

    if (name.length <= 1 || name.length > 256) {
      errors.push('Name must be between 1 and 256 characters long.')
    }
    if (address.length <= 1 || address.length > 256) {
      errors.push('Address must be between 1 and 256 characters long.')
    }
    if (city.length <= 1 || city.length > 100) {
      errors.push('City must be between 1 and 100 characters long.')
    }
    if (state.length <= 1 || state.length > 100) {
      errors.push('State must be between 1 and 100 characters long.')
    }
    if (country.length <= 1 || country.length > 100) {
      errors.push('Country must be between 1 and 100 characters long.')
    }
    if (price.length < 1) {
      errors.push('Please enter a price.')
    } else if (Number(price) != price) {
      errors.push('Price must be a number.')
    } else if (Number(price) >= 100000000) {
      errors.push('That bee is too expensive.')
    }
    if (description.length > 256) {
      errors.push('Description cannot be more than 256 characters long.')
    }
    if (details.length > 1000) {
      errors.push('Details cannot be more than 1000 characters long.')
    }

    setValidationErrors(errors);
  }, [name, address, city, state, country, price, description, details]);

  useEffect(() => {
    if (!coverImage) return;

    const previewUrl = URL.createObjectURL(coverImage);
    if (previewUrl) setSidebarImg(previewUrl);
  }, [coverImage]);

  // useEffect(() => {
  //   if (!addImages) return;

  //   const fileList = [];

  //   addImages.forEach(file => {
  //     const previewUrl = URL.createObjectURL(file);
  //     if (previewUrl) fileList.push(previewUrl);
  //   })

  //   setPreviewURLs(fileList);
  // }, [addImages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      const error = ['You must be logged in to post a new bee.'];
      setValidationErrors([...error, ...validationErrors]);
      setHideErrors(false);
    }

    if (!validationErrors.length) {
      let payload = {
        name,
        address,
        city,
        state,
        country,
        price,
        image: coverImage,
        description,
        details,
        userId: user.id
      };

      // console.log('handleSubmit(before): ', payload)

      let newBee = await dispatch(createBee(payload));
      // console.log('handleSubmit(after): ', newBee)
      // console.log('errors within handleSubmit: ', errors)

      if (newBee.id) {
        // console.log('handleSubmit(if newBee runs): ', newBee)
        if (addImages) {
          console.log('addImages payload', Array.from(addImages));
          payload = {
            imageList: Array.from(addImages)
          };
          dispatch(addBeeImages(payload, newBee.id));
        }

        history.push(`/bees/${newBee.id}`);
      }
    } else setHideErrors(false);
  }

  const updateCoverImg = e => {
    const file = e.target.files[0];
    // console.log('file', file);
    if (file) setCoverImage(file);
    // console.log('coverImage', coverImage);
  }

  const updateAdditionalImgs = e => {
    const files = e.target.files;
    // console.log('files', files);
    if (files) {
      // console.log('files', files);
      const fileList = [];
      Array.from(files).forEach(file => fileList.push(file));
      setAddImages(fileList);
    }
    // console.log('addImages', addImages);
  }
  // console.log('addImages', addImages);

  return (
    <div className="new-bee-main-container">
      <main>
        <div className='form-containers'>
          <div className="login-or-signup">
            <p>
              Add a new bee!
            </p>
          </div>
          <div
            className="errors"
            hidden={hideErrors}
          >
            <ul>
              {validationErrors && validationErrors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
          <form
            className="forms"
            id="new-bee-form"
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
            <label>Description</label>
            <input
              type='text'
              onChange={e => setDescription(e.target.value)}
              value={description}
              placeholder='A short description of the bee...'
            />
            <label>Details</label>
            <input
              type='text'
              onChange={e => setDetails(e.target.value)}
              value={details}
              placeholder='Some details about the bee...'
            />
            <div className="img-label-wrapper" id="cover-img-label-wrapper">
              <div>
                <label>Cover Image:&nbsp;</label>
              </div>
              <label className="img-details">
                The first image of your bee you would like users to see.
              </label>
            </div>
            <input
              type='file'
              accept="image/*"
              onChange={updateCoverImg}
              className='upload-file'
            />
            <div className="img-label-wrapper">
              <div>
                <label>Additional Images:&nbsp;</label>
              </div>
              <label className="img-details">
                Additional images of your bee.
              </label>
            </div>
            <input
              type='file'
              accept="image/*"
              multiple
              onChange={updateAdditionalImgs}
              className='upload-file'
            />
            <button id='new-bee-submit'>Submit</button>
          </form>
        </div>
      </main>
      <aside className="sidebar">
        <div className="new-bee-sidebar-img">
          {/* <picture id="sidebar-img"> */}
          <img
            src={sidebarImg}
            className='sidebar-img'
            alt="sidebar-img"
            />
            {/* {previewURLs && previewURLs.forEach((imageUrl, idx) => (
              <source
                src={imageUrl}
                className='sidebar-img'
                hidden={!(shownImg === idx)}></source>
              // console.log('imageUrl', imageUrl)
            ))} */}
          {/* </picture> */}
        </div>
      </aside>
    </div>
  );
}

export default NewBeeForm;
