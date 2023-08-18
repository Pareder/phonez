import capitalize from 'utils/capitalize';

export default function getDataSource(details) {
  return [
    {
      title: 'Brand',
      description: capitalize(details.brand),
    },
    {
      title: 'Name',
      description: details.phone_name,
    },
    {
      title: 'Dimension',
      description: details.dimension,
    },
    {
      title: 'OS',
      description: details.os,
    },
    {
      title: 'Storage',
      description: details.storage,
    },
    {
      title: 'Release Date',
      description: details.release_date,
    },
    ...details.specifications.map(specification => ({
      title: specification.title,
      description: specification.specs.map(spec => (
        <p key={spec.key}>{spec.key}: {spec.val}</p>
      )),
    })),
  ];
}
