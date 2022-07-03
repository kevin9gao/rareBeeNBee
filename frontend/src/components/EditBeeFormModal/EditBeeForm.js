import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { editBee, getBees } from "../../store/bees";

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
  const [validationErrors, setValidationErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState(true);

  useEffect(() => {
    dispatch(getBees());
  }, [dispatch]);

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

    setValidationErrors(errors);
  }, [name, address, city, state, country, price, imageUrl]);

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
    <div className='form-containers'>
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
        <label>Name</label>
        <input
          type='text'
          onChange={e => setName(e.target.value)}
          value={name}
          placeholder={name}
          required
        />
        <label>Street Name</label>
        <input
          type='text'
          onChange={e => setAddress(e.target.value)}
          value={address}
          placeholder={address}
          required
        />
        <label>City</label>
        <input
          type='text'
          onChange={e => setCity(e.target.value)}
          value={city}
          placeholder={city}
          required
        />
        <label>State</label>
        <input
          type='text'
          onChange={e => setState(e.target.value)}
          value={state}
          placeholder={state}
          required
        />
        <label>Country</label>
        <input
          type='text'
          onChange={e => setCountry(e.target.value)}
          value={country}
          placeholder={country}
          required
        />
        <label>Price</label>
        <input
          type='text'
          onChange={e => setPrice(e.target.value)}
          value={price}
          placeholder={price}
          required
        />
        <label>Image Url</label>
        <input
          type='text'
          onChange={e => setImageUrl(e.target.value)}
          value={imageUrl}
          placeholder={imageUrl}
          required
        />
        <button id='edit-bee-submit'>Submit</button>
      </form>
    </div>
  );
};

export default EditBeeForm;
