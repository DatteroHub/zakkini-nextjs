"use client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

export const NisabAssetsChart = ({
  nisab,
  assets,
}: {
  nisab: number;
  assets: number;
}) => {
  const t = useTranslations("Charts.NisabZakat");

  const chartData = [
    { status: "nisab", value: nisab, fill: "var(--color-nisab)" },
    { status: "assets", value: assets, fill: "var(--color-assets)" },
    ...assets >= nisab ? [{
      status: "zakat",
      value: (assets / 40).toFixed(2),
      fill: "var(--color-zakat)",
    }]:[],
  ];
  const chartConfig = {
    value: {
        label: t("tooltip"),
      },
    nisab: {
      label: t("nisabLabel"),
      color: "hsl(var(--chart-4))",
    },
    assets: {
      label: t("assetsLabel"),
      color: "hsl(var(--chart-2))",
    },
    zakat: {
      label: t("zakatPrevisionLabel"),
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{t("title")}</CardTitle>
        <CardDescription>{t("desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 5,
            }}
          >
            <YAxis
              dataKey="status"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="value" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent  />}
            />
            <Bar dataKey="value" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none text-muted-foreground">
          {nisab > assets ? (
            <>
              {t("nisabWins")}
              <TrendingDown className="h-4 w-4" />
            </>
          ) : (
            <>
              {t("assetsWins")}
              <TrendingUp className="h-4 w-4" />
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
