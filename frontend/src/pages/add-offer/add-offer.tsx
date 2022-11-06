import { NewOffer } from '../../types/types';
import { CITIES, CityLocation } from '../../const';
import OfferForm from '../../components/offer-form/offer-form';
import { useAppDispatch } from '../../hooks';
import { postOffer } from '../../store/action';
import { adaptOfferToServer } from '../../utils/adapters/adaptersToServer';

const emptyOffer: NewOffer = {
  title: '',
  description: '',
  city: { name: CITIES[0], location: CityLocation[CITIES[0]] },
  previewImage: '',
  isPremium: false,
  type: 'apartment',
  bedrooms: 1,
  maxAdults: 1,
  price: 0,
  goods: [],
  location: CityLocation[CITIES[0]],
};

const AddOffer = (): JSX.Element | null => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (offerRawData: NewOffer) => {
    const offerData = adaptOfferToServer(offerRawData);
    dispatch(postOffer(offerData));
  };

  return (
    <main className="page__main">
      <div className="container">
        <section>
          <h1>Add new offer</h1>
          <OfferForm offer={emptyOffer} onSubmit={handleFormSubmit} />
        </section>
      </div>
    </main>
  );};

export default AddOffer;
