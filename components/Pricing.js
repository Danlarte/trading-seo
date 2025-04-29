import config from "@/config";
import ButtonCheckout from "./ButtonCheckout";
import Encabezado from "@/components/home/Encabezado";
import Image from "next/image";

const Pricing = () => {
  return (
    <section className="bg-white overflow-hidden" id="pricing">
      <div className="py-12 px-4   mx-auto">
        <Encabezado titulo="Membresía de Inversión TradingPRO" />

        <div className="mt-8 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {config.stripe.plans.map((plan) => (
            <div
              key={plan.priceId}
              className="relative flex flex-col rounded-2xl border-2 border-[#54BCAF] bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {plan.isFeatured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[#54BCAF] text-white">
                    POPULAR
                  </span>
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#17498A] mb-4">
                  {plan.name}
                </h3>
                {plan.description && (
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                )}
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold text-[#54BCAF]">
                    {plan.price}€
                  </span>
                  <span className="ml-1 text-xl font-semibold text-gray-500">
                    {plan.name == "Anual"
                      ? "/año"
                      : plan.name == "Semestral"
                      ? "/semestre"
                      : "/mes"}
                  </span>
                </div>
                {plan.features && (
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg
                          className="w-5 h-5 text-[#54BCAF] mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-600">{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <ButtonCheckout
                priceId={plan.priceId}
                text={`Obtener ${plan.name}`}
                className="w-full"
                mode="subscription"
              />
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Image
            src="/Toros2.png"
            alt="Toros"
            width={1200}
            height={100}
            className="w-full max-w-4xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
