import { useParams } from "react-router";
import { useAuctionRoomStore } from "../store/auctionRoomStore";
import { useEffect, useMemo, useState } from "react";
import { number, object, ObjectSchema } from "yup";
import { useFormik } from "formik";
import { useAuthStore } from "../store/authStore";
import { useShowNoti } from "../context/notificationContext";

export const useAuctionRoom = () => {
  const params = useParams();
  const auctionId = params["id"];

  const { auction, bids, isLoading, fetchData, publishBid } = useAuctionRoomStore((state) => state);
  const { sendSuccess } = useShowNoti()
  const user = useAuthStore((state) => state.user)

  const [bidSchema, setBidSchema] = useState<ObjectSchema<{ bid: number }>>();
  const [open, setOpen] = useState<boolean>(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const maxBid = useMemo(() => {
    if (!bids || bids.length === 0) return auction.price;
    return Math.max(...bids.map(b => b.bid));
  }, [bids]);

  useEffect(() => {
    const schema = object({
      bid: number().positive().min(maxBid + 1, `La puja debe ser mayor a ${maxBid}`).required("La puja es obligatoria"),
    });
    setBidSchema(schema);
  }, [maxBid]);

  const formik = useFormik({
    initialValues: {
      bid: 0
    },
    validationSchema: bidSchema,
    onSubmit: (values: { bid: number }) => {
      publishBid({ auctionId: auction.id, bid: values.bid, userId: user.id })
      setOpen(false)
      sendSuccess(`Has publicado la oferta de ${values.bid} para la subasta de ${auction.product.name}`)
    }
  })
  const loadData = async () => {
    if (auctionId) {
      await fetchData(auctionId);
    }
  }

  useEffect(() => {
    loadData()
  }, []);

  return {
    auction,
    bids,
    isLoading,
    formik,
    maxBid,
    open,
    handleClick,
    handleClose
  };
};
