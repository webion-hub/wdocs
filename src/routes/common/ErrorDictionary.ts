export interface IError {
  readonly title: string;
  readonly message: string;
}

export interface IErrorDescription {
  readonly timestamp: Date;
  readonly errors: IError[];
}

export class ErrorDictionary {
  private readonly errors: IError[] = [];

  public addIf(condition: boolean, title: string, message: string): void {
    if (condition) {
      this.add(title, message);
    }
  }

  public add(title: string, message: string): void {
    this.errors.push({ title, message });
  }

  public any(): boolean {
    return this.errors.length > 0;
  }

  public getAll(): IError[] {
    return this.errors;
  }

  public describe(): IErrorDescription {
    const error = {
      timestamp: new Date(),
      errors: this.errors,
    }

    console.log(error);
    return error;
  }

  public static single(title: string, message: string): ErrorDictionary {
    const errors = new ErrorDictionary();
    errors.add(title, message);
    return errors;
  }
}