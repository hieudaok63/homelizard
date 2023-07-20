import { z } from "zod";





export const registerSchema = z
  .object({
    email: z
      .string({
        required_error: "E-Mail is ist erforderlich",
      })
      .trim()
      .min(1, "E-Mail ist erforderlich")
      .email({
        message: "Ungültige E-Mail",
      }),
    password: z
      .string({
        required_error: "Passwort ist erforderlich",
      })
      .trim()
      .min(1, "Passwort ist erforderlich"),
    confirmPassword: z
      .string({
        required_error: "Passwort wiederholen ist erforderlich",
      })
      .trim()
      .min(1, "Passwort wiederholen ist erforderlich"),
    // gender: z.string({
    //   required_error: "Anrede ist erforderlich",
    // }),
    // firstName: z
    //   .string({
    //     required_error: "Vorname ist erforderlich",
    //   })
    //   .trim()
    //   .min(1, "Vorname ist erforderlich"),
    // lastName: z
    //   .string({
    //     required_error: "Nachname ist erforderlich",
    //   })
    //   .trim()
    //   .min(1, "Nachname ist erforderlich"),
    // is_agree: z.boolean().optional(),
  })
  .refine(({ password, confirmPassword }) => confirmPassword === password, {
    message: "Wiederholungspasswort stimmt nicht überein",
    path: ["confirmPassword"],
  });

export const verifyCodeSchema = z.object({
  code: z.string().min(1, "Please enter a valid code"),
});

export const registerNameGenderSchema = z.object({
  gender: z.string({
    required_error: "Anrede ist erforderlich",
  }),
  firstName: z
    .string({
      required_error: "Vorname ist erforderlich",
    })
    .trim()
    .min(1, "Vorname ist erforderlich"),
  lastName: z
    .string({
      required_error: "Nachname ist erforderlich",
    })
    .trim()
    .min(1, "Nachname ist erforderlich"),
});