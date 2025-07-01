import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { object, string, number, array, date, mixed } from "yup";

import { useAuctionsCatalogStore } from "../store/auctionStore"
import type { Auction, AuctionFormValues, Category } from "../interfaces/auctionInterface"
import { useAuthStore } from "../store/authStore"
import { useShowNoti } from "../context/notificationContext"
import { useFormik } from "formik";


const categoryOptions = [
  "Electrónica", "Moda", "Hogar", "Deportes", "Juguetes", "Herramientas",
  "Libros", "Belleza", "Videojuegos", "Música", "Películas", "Arte",
  "Coleccionables", "Salud", "Mascotas", "Automotriz", "Jardín",
  "Oficina", "Viajes", "Instrumentos"
];

const stateOptions = ["ended", "sealed bid auction", "current bid"];

const bidTypes = ["fixed increment", "percentage increment", "automatic proxy"];

export const auctionForm = object({
  bidType: string()
    .oneOf(bidTypes, 'El tipo de puja debe ser válido')
    .required('El tipo de puja es obligatorio'),

  image: mixed()
    .nullable()
    .test('fileSize', 'La imagen debe ser menor a 2 MB', value =>
      !value || (value as File).size <= 2 * 1024 * 1024
    )
    .test('fileType', 'Formato no soportado', value =>
      !value || ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes((value as File).type)
    ),

  imagePreview: string().nullable(),

  product: object({
    name: string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(100, "El nombre es demasiado largo")
      .required("El nombre del producto es obligatorio"),

    mainCategory: string()
      .oneOf(categoryOptions, "La categoría principal no es válida")
      .required("La categoría principal es obligatoria"),

    categories: array()
      .of(string().oneOf(categoryOptions, "Categoría inválida"))
      .min(1, "Debes seleccionar al menos una categoría")
      .required("Las categorías son obligatorias"),

    description: string()
      .min(10, "La descripción es muy corta")
      .max(1000, "La descripción es demasiado larga")
      .required("La descripción es obligatoria"),
  }),

  state: string()
    .oneOf(stateOptions, "Estado de subasta inválido")
    .required("El estado es obligatorio"),

  endDate: date()
    .min(new Date(), "La fecha debe ser en el futuro")
    .required("La fecha de cierre es obligatoria"),

  price: number()
    .positive("El precio debe ser un número positivo")
    .required("El precio es obligatorio")
});


export const useAuctionsCatalog = () => {
  const {
    auctions,
    pinnedAuctions,
    auctionsHistory,
    auctionsStates,
    bidTypes,
    categories,
    isLoading,
    error,
    fetchData,
    savePin,
    removePin,
    closeAuction,
    deleteAuction,
    editAuction,
    publishAuction
  } = useAuctionsCatalogStore((state) => state)
  const user = useAuthStore((state) => state.user)
  const { sendError } = useShowNoti()
  const navigate = useNavigate()

  const handleSubmit = async (values: AuctionFormValues) => {
    try {
      let imageBase64 = "";
      if (values.image) {
        imageBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(values.image!);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (err) => reject(err);
        });
      }

      const payload = {
        bidType: values.bidType,
        endDate: new Date(values.endDate),
        price: values.price,
        product: {
          name: values.product.name,
          image: imageBase64 || values.imagePreview || "",
          mainCategory: values.product.mainCategory,
          categories: values.product.categories,
          description: values.product.description
        },
        state: values.state
      };

      if (auction) {
        await editAuction({ id: auction.id, ...payload });
      } else {
        await publishAuction(payload);
      }

      handleClose();
    } catch (err) {
      if (err instanceof Error) {
        sendError(err.message);
      }
    }
  };


  const initialValues: AuctionFormValues = {
    bidType: "",
    image: null,
    imagePreview: null,
    product: {
      name: "",
      mainCategory: "",
      categories: [],
      description: "",
    },
    state: "current bid",
    endDate: "",
    price: 0,
  };

  const formik = useFormik<AuctionFormValues>({
    initialValues,
    validationSchema: auctionForm,
    onSubmit: handleSubmit
  });

  const [filteredCatalog, setFilteredCatalog] = useState<Auction[]>([])
  const [pinnedCatalog, setPinnedCatalog] = useState<Auction[]>([])

  const [productFilter, setProductFilter] = useState<string>("")
  const [bidTypeFilter, setBidTypeFilter] = useState<string | null>(null)
  const [categoriesFilter, setCategoriesFilter] = useState<Category[]>([])
  const [auctionsStateFilter, setAuctionsStateFilter] = useState<string | null>(null)

  const [auction, setAuction] = useState<Auction | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
    formik.resetForm()
    setAuction(null)
  }
  const toLocalDatetime = (isoDate: string) => {
    const date = new Date(isoDate);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
  };


  const handleEdit = (auction: Auction) => {
    setOpen(true);
    setAuction(auction);

    formik.setValues({
      bidType: auction.bidType || "",
      image: null,
      imagePreview: auction.product.image || null,
      product: {
        name: auction.product.name || "",
        mainCategory: auction.product.mainCategory || "",
        categories: auction.product.categories || [],
        description: auction.product.description || "",
      },
      state: "current bid",
      endDate: auction.endDate ? toLocalDatetime(auction.endDate) : "",
      price: auction.price || 0,
    });
  };



  const navAuction = (auctionId: string) => {
    navigate(`auctionRoom/${auctionId}`)
  }

  const isAdmin = useMemo(() => { return user.role === "admin" }, [user])

  const pinActions = (auction: Auction) => {

    if (pinnedCatalog.includes(auction)) {
      const existingPin = pinnedAuctions.find(p => p.auctionId === auction.id);
      if (existingPin) {
        removePin(existingPin.id);
      }
    } else {
      if (pinnedAuctions.length > 3) {
        sendError("No puedes fijar más de 4 publicaciones")
        return;
      }
      savePin(user.id, auction.id)
    }
  }

  const loadData = async () => {
    await fetchData(user.id)
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    let catalog = auctions;
    if (bidTypeFilter) {
      catalog = catalog.filter((auction) => auction.bidType === bidTypeFilter)
    }
    if (categoriesFilter.length > 0) {
      catalog = catalog.filter((auction) =>
        auction.product.categories.some((cat) =>
          categoriesFilter.some((filterCat) => filterCat.name === cat)
        )
      )
    }
    if (auctionsStateFilter) {
      catalog = catalog.filter((auction) => auction.state === auctionsStateFilter)
    }
    if (productFilter.trim().length > 0) {
      catalog = catalog.filter((auction) => auction.product.name.toLowerCase().startsWith(productFilter.toLowerCase()))
    }
    setFilteredCatalog(catalog);
  }, [bidTypeFilter, categoriesFilter, auctionsStateFilter, productFilter])

  useEffect(() => {
    const pinnedIds = new Set(pinnedAuctions.map(p => p.auctionId));
    const pinned = auctions.filter((auction) => pinnedIds.has(auction.id))
    setPinnedCatalog(pinned)
  }, [pinnedAuctions])

  useEffect(() => {
    setFilteredCatalog(auctions)
  }, [auctions])

  return {
    data: {
      filteredCatalog,
      pinnedCatalog,
      auctionsHistory
    },
    filterData: {
      auctionsStates,
      bidTypes,
      categories,
    },
    filters: {
      productFilter,
      bidTypeFilter,
      categoriesFilter,
      auctionsStateFilter,
      setProductFilter,
      setBidTypeFilter,
      setCategoriesFilter,
      setAuctionsStateFilter
    },
    pinActions,
    navAuction,
    deleteAuction,
    closeAuction,
    error,
    isLoading,
    isAdmin,
    auctionForm: {
      open,
      auction,
      formik,
      handleOpen,
      handleEdit,
      handleClose
    }
  }
}