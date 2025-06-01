export type TaxonomyItem = {
  id: number;
  name: string;
  korean_name: string;
};

export type Taxonomy = {
  order: TaxonomyItem;
  family: TaxonomyItem;
  genus: TaxonomyItem;
  species: TaxonomyItem;
};
