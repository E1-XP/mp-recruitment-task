import Table from "../components/Table";

export default {
  title: "Paginated Table",
  component: Table,
};

const initialData = {
  items: [
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 2528834,
      name: "javascript",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 2192285,
      name: "python",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 1917270,
      name: "java",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 1615041,
      name: "c#",
    },
    {
      collectives: [
        {
          tags: ["php"],
          external_links: [
            {
              type: "support",
              link: "https://stackoverflow.com/contact?topic=15",
            },
          ],
          description:
            "A collective where developers working with PHP can learn and connect about the open source scripting language.",
          link: "/collectives/php",
          name: "PHP",
          slug: "php",
        },
      ],
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 1464452,
      name: "php",
    },
    {
      collectives: [
        {
          tags: ["android", "ios"],
          external_links: [
            {
              type: "support",
              link: "https://stackoverflow.com/contact?topic=15",
            },
          ],
          description:
            "A collective for developers who want to share their knowledge and learn more about mobile development practices and platforms",
          link: "/collectives/mobile-dev",
          name: "Mobile Development",
          slug: "mobile-dev",
        },
      ],
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 1417198,
      name: "android",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 1187305,
      name: "html",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 1034792,
      name: "jquery",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 806772,
      name: "c++",
    },
    {
      has_synonyms: true,
      is_moderator_only: false,
      is_required: false,
      count: 804218,
      name: "css",
    },
  ],
  has_more: true,
  quota_max: 10000,
  quota_remaining: 9933,
  total: 65704,
};

export const PaginatedTable = () => <Table initialData={initialData} />;
