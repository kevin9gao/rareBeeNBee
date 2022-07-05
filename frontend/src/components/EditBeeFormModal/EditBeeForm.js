import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { editBee, getBees } from "../../store/bees";
import '../NewBeeForm/BeeForm.css';

const EditBeeForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { beeId } = useParams();
  const user = useSelector(state => state.session.user);
  const bee = useSelector(state => state.bees[beeId]);

  const [name, setName] = useState(bee.name);
  const [address, setAddress] = useState(bee.address);
  const [city, setCity] = useState(bee.city);
  const [state, setState] = useState(bee.state);
  const [country, setCountry] = useState(bee.country);
  const [price, setPrice] = useState(bee.price);
  const [imageUrl, setImageUrl] = useState(bee.imageUrl);
  const [description, setDescription] = useState(bee.description);
  const [details, setDetails] = useState(bee.details);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState(true);
  const [sidebarImg, setSidebarImg] = useState(imageUrl);

  useEffect(() => {
    dispatch(getBees());
  }, [dispatch]);

  useEffect(() => {
    if (imageUrl.length > 0) {
      if (imageUrl.toLowerCase().endsWith('.jpg') ||
        imageUrl.toLowerCase().endsWith('.jpeg') ||
        imageUrl.toLowerCase().endsWith('.png')) {
        setSidebarImg(imageUrl)
      }
    } else if (imageUrl.length === 0) {
      setSidebarImg(bee.imageUrl);
    }
  }, [imageUrl])

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
    if (Number(price) != price) {
      errors.push('Price must be a number.')
    } else if (Number(price) >= 100000000) {
      errors.push('That bee is too expensive.')
    }
    if (imageUrl.length <= 1 || imageUrl.length > 500) {
      errors.push('Image Url must be between 1 and 500 characters long.')
    } else if (!(imageUrl.toLowerCase().endsWith('.jpg') ||
      imageUrl.toLowerCase().endsWith('.jpeg') ||
      imageUrl.toLowerCase().endsWith('.png'))) {
      errors.push('Image must be a .jpg, .jpeg, or .png link.')
    }
    if (description.length > 256) {
      errors.push('Description cannot be more than 256 characters long.')
    }
    if (details.length > 1000) {
      errors.push('Details cannot be more than 1000 characters long.')
    }

    setValidationErrors(errors);
  }, [name, address, city, state, country, price, imageUrl, description, details]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      address,
      city,
      state,
      country,
      price,
      imageUrl,
      description,
      details,
      userId: user.id
    }

    // console.log('handleSubmit before dispatch, payload: ', payload);
    // console.log('handleSubmit before dispatch, beeId: ', beeId);
    // console.log('validationErrors', validationErrors);
    // console.log('Number(price): ', Number(price));
    // console.log('typeof price: ', typeof Number(price));

    if (!validationErrors.length) {
      await dispatch(editBee(payload, beeId));
      history.push(`/bees/${beeId}`);
      setShowModal();
    } else {
      setHideErrors(false);
    }
  }

  return (
    <div className="edit-bee-main-container">
      <main>
        <div className='form-containers edit-form-container'>
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
            id="edit-bee-form"
            onSubmit={handleSubmit}
          >
            <div className="edit-inputs">
              <label>Name</label>
              <input
                type='text'
                onChange={e => setName(e.target.value)}
                value={name}
                placeholder={name}
                required
              />
            </div>
            <div className="edit-inputs">
              <label>Street Name</label>
              <input
                type='text'
                onChange={e => setAddress(e.target.value)}
                value={address}
                placeholder={address}
                required
              />
            </div>
            <div className="edit-inputs">
              <label>City</label>
              <input
                type='text'
                onChange={e => setCity(e.target.value)}
                value={city}
                placeholder={city}
                required
              />
            </div>
            <div className="edit-inputs">
              <label>State</label>
              <input
                type='text'
                onChange={e => setState(e.target.value)}
                value={state}
                placeholder={state}
                required
              />
            </div>
            <div className="edit-inputs">
              <label>Country</label>
              <input
                type='text'
                onChange={e => setCountry(e.target.value)}
                value={country}
                placeholder={country}
                required
              />
            </div>
            <div className="edit-inputs">
              <label>Price</label>
              <input
                type='text'
                onChange={e => setPrice(e.target.value)}
                value={price}
                placeholder={price}
                required
              />
            </div>
            <div className="edit-inputs">
              <label>Image Url</label>
              <input
                type='text'
                onChange={e => setImageUrl(e.target.value)}
                value={imageUrl}
                placeholder={imageUrl}
                required
              />
            </div>
            <div className="edit-inputs">
              <label>Description</label>
              <input
                type='text'
                onChange={e => setDescription(e.target.value)}
                value={description}
                placeholder={description}
              />
            </div>
            <div className="edit-inputs">
              <label>Details</label>
              <input
                type='text'
                onChange={e => setDetails(e.target.value)}
                value={details}
                placeholder={details}
              />
            </div>
              <button id='edit-bee-submit'>Submit</button>
          </form>
        </div>
      </main>
      <aside className="sidebar">
        <div className="new-bee-sidebar-img">
          <img
            src={sidebarImg}
            id='edit-sidebar-img'
            alt="sidebar-img"
          />
        </div>
      </aside>
    </div>
  );
};

export default EditBeeForm;
