import Property from "app/Initials/__noAuth/Property";

const property = {
  title: 'Esika - Propriété',
  secured: false,
  path: '/property/:slug',
  exact: true,
  Component: Property,
};

export default property;