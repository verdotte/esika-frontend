import Property from "app/Initials/__auth/Property";

const property = {
  title: 'Esika - Propriété',
  secured: false,
  path: '/property/:slug',
  exact: true,
  Component: Property,
};

export default property;