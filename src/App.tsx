import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";
import React, { useState } from "react";
import smart from "./assets/smart.png";
import smile from "./assets/smile.png";
import drums from "./assets/drums.png";
import smileArrow from "./assets/smile-arrow.png";
import gift from "./assets/gift.png";
import cashback from "./assets/cashback.png";
import percent from "./assets/percent.png";
import free from "./assets/free.png";
import transfer from "./assets/transfer.png";
import cash from "./assets/cash.png";
import films from "./assets/films.png";
import music from "./assets/music.png";
import mobile from "./assets/mobile.png";
import { LS, LSKeys } from "./ls";
import { appSt } from "./style.css";
import { ThxLayout } from "./thx/ThxLayout";
import { Gap } from "@alfalab/core-components/gap";
import { Plate } from "@alfalab/core-components/plate";
import { StatusBadge } from "@alfalab/core-components/status-badge";

interface Product {
  title: string;
  text: string;
  image: string;
}

interface Categories {
  title: string;
  products: Array<Product>;
}

const categories: Array<Categories> = [
  {
    title: "Кэшбэк",
    products: [
      {
        title: "+1 топовая категория кэшбэка",
        text: "5% на самое популярное",
        image: smileArrow,
      },
      {
        title: "+1 попытка крутить барабан суперкэшбэка",
        text: "Выше шанс выиграть до 100% в случайной категории",
        image: drums,
      },
      {
        title: "Увеличенный лимит кэшбэка",
        text: "7000 ₽ в месяц вместо 5000 ₽ за покупки в категориях",
        image: cashback,
      },
      {
        title: "Секретная подборка партнёров с кэшбэком",
        text: "Доступ к специальным предложениям",
        image: gift,
      },
    ],
  },
  {
    title: "Развлечения",
    products: [
      {
        title: "Подписка на онлайн-кинотеатр",
        text: "Фильмы и сериалы в отличном качестве",
        image: films,
      },
      {
        title: "Подписка на музыку",
        text: "Миллионы треков и тысячи подкастов",
        image: music,
      },
      {
        title: "Интернет и мобильная связь",
        text: "Специальный тариф для молодых и свободных",
        image: mobile,
      },
    ],
  },
  {
    title: "Сервисы",
    products: [
      {
        title: "Бесплатные уведомления",
        text: "Пуши и смс об операциях по всем дебетовым картам",
        image: free,
      },
      {
        title: "Бесплатные переводы",
        text: "По России без ограничений по сумме",
        image: transfer,
      },
      {
        title: "Бесплатное снятие наличных",
        text: "В банкоматах любых банков России",
        image: cash,
      },
    ],
  },
  {
    title: "Накопления",
    products: [
      {
        title: "+1% годовых",
        text: "По накопительному Альфа-Счёту на ежедневный остаток",
        image: percent,
      },
    ],
  },
];

export const App = () => {
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [optionsCount, setOptionsCount] = useState(5);
  const isFiveOptionsSelected = optionsCount > 0 && optionsCount <= 5;

  const clickSubmit = () => {
    // window.gtag("event", "connect_click", {
    //   variant_name: "ghk_3579_android_18_22_2",
    // });
  };

  const findProduct = (product: Product) => {
    return selectedProducts.find((option) => option.title === product.title);
  };

  const selectProducts = (product: Product) => {
    const find = findProduct(product);
    const filteredProducts = selectedProducts.filter(
      (p) => p.title !== product.title,
    );

    if (filteredProducts.length === 5) {
      return;
    }

    if (find) {
      setSelectedProducts(filteredProducts);
      setOptionsCount((prevState) => prevState + 1);
    } else {
      setSelectedProducts([...selectedProducts, product]);
      setOptionsCount((prevState) => prevState - 1);
    }
  };

  const submit = () => {
    clickSubmit();
    LS.setItem(LSKeys.ShowThx, true);
    setThx(true);
  };

  const optionText = (count: number) => {
    switch (count) {
      case 1:
        return "опцию";
      case 2:
      case 3:
      case 4:
        return "опции";
      case 5:
        return "опций";
    }
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.box}>
          <img src={smart} alt="Картинка Альфа-Смарт" />
          <Typography.TitleResponsive
            tag="h1"
            view="medium"
            font="system"
            weight="bold"
          >
            Альфа-Смарт
          </Typography.TitleResponsive>
          <Typography.Text view="primary-medium" color="secondary">
            Стоимость — 299 руб/мес
          </Typography.Text>
        </div>

        <div className={appSt.subscription}>
          <img src={smile} alt="" width={24} height={24} />
          <Typography.Text
            view="primary-medium"
            className={appSt.subscriptionText}
          >
            Подписка стоит 299 ₽, если тратите с карты 20 000 ₽ в месяц. Если
            тратите меньше — 399 ₽
          </Typography.Text>
        </div>

        <Gap size={8} />

        {
          <Plate
            view={isFiveOptionsSelected ? "attention" : "positive"}
            title={
              isFiveOptionsSelected
                ? `Выбери ${optionsCount} ${optionText(optionsCount)}`
                : "Все 5 опций выбраны"
            }
            leftAddons={
              <StatusBadge
                view={
                  isFiveOptionsSelected
                    ? "attention-alert"
                    : "positive-checkmark"
                }
              />
            }
          />
        }

        <div className={appSt.products}>
          {categories.map((category) => (
            <React.Fragment key={category.title}>
              <Gap size={8} />
              <Typography.TitleResponsive
                font="system"
                tag="h2"
                weight="bold"
                view="small"
                className={appSt.productsTitle}
              >
                {category.title}
              </Typography.TitleResponsive>
              {category.products.map((product) => (
                <div
                  className={appSt.product}
                  key={product.title}
                  onClick={() => {
                    selectProducts(product);
                  }}
                  style={{
                    ...(findProduct(product)
                      ? {
                          border: "2px solid #0cc44d",
                        }
                      : { border: "2px solid #F2F3F5", opacity: "0.5" }),
                  }}
                >
                  {findProduct(product) && (
                    <StatusBadge
                      view={"positive-checkmark"}
                      size={24}
                      className={appSt.statusBadge}
                    />
                  )}
                  <div>
                    <Typography.TitleResponsive
                      font="system"
                      view="small"
                      weight="bold"
                      tag="h3"
                      className={appSt.productTitle}
                    >
                      {product.title}
                    </Typography.TitleResponsive>

                    <Typography.Text
                      view="secondary-large"
                      tag="p"
                      color="secondary"
                      className={appSt.productText}
                    >
                      {product.text}
                    </Typography.Text>
                  </div>
                  <img
                    src={product.image}
                    alt=""
                    width={96}
                    height={96}
                    className={appSt.productIcon}
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <Gap size={72} />

      {selectedProducts.length === 5 && (
        <div className={appSt.bottomBtn}>
          <ButtonMobile block view="primary" onClick={submit}>
            Подключить
          </ButtonMobile>
        </div>
      )}
    </>
  );
};
