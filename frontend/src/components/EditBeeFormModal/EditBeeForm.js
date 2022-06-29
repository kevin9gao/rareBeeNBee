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

  useEffect(() => {
    dispatch(getBees());
  }, [dispatch]);

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

    let updatedBee = await dispatch(editBee(payload, beeId));

    // console.log('handleSubmit after dispatch, updatedBee: ', updatedBee);

    if (updatedBee) {
      // console.log('handleSubmit if updatedBee, updatedBee: ', updatedBee);
      history.push(`/bees/${beeId}`);
      setShowModal();
    }
  }

  return (
    <div className='form-containers'>
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
        />
        <label>Street Name</label>
        <input
          type='text'
          onChange={e => setAddress(e.target.value)}
          value={address}
          placeholder={address}
        />
        <label>City</label>
        <input
          type='text'
          onChange={e => setCity(e.target.value)}
          value={city}
          placeholder={city}
        />
        <label>State</label>
        <input
          type='text'
          onChange={e => setState(e.target.value)}
          value={state}
          placeholder={state}
        />
        <label>Country</label>
        <input
          type='text'
          onChange={e => setCountry(e.target.value)}
          value={country}
          placeholder={country}
        />
        <label>Price</label>
        <input
          type='text'
          onChange={e => setPrice(e.target.value)}
          value={price}
          placeholder={price}
        />
        <label>Image Url</label>
        <input
          type='text'
          onChange={e => setImageUrl(e.target.value)}
          value={imageUrl}
          placeholder={imageUrl}
        />
        <button id='edit-bee-submit'>Submit</button>
      </form>
    </div>
  );
};

export default EditBeeForm;
