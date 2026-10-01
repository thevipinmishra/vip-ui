// Minimal compositions for each component page. Keep these in sync with the demos.
export const anatomy: Record<string, string> = {
  "command-palette": `<CommandPalette isOpen={open} onOpenChange={setOpen}>
  <CommandPaletteItem onAction={createProject}>New project</CommandPaletteItem>
  <CommandPaletteItem onAction={openSettings}>Open settings</CommandPaletteItem>
</CommandPalette>`,
  "token-field": `<TokenField
  allowsNewlines
  value={value}
  onChange={setValue}
  onSubmit={() => setValue(value.commit())}
>
  <TokenFieldLabel>Tags</TokenFieldLabel>
  <TokenFieldInput placeholder="Add a tag" />
  <TokenFieldDescription>Separate tags with commas.</TokenFieldDescription>
</TokenField>`,
  tree: `<Tree aria-label="Files" selectionMode="single">
  <TreeItem id="design" title="Design">
    <TreeItem id="logo" title="Logo.svg" />
  </TreeItem>
</Tree>`,
  "drop-zone": `<DropZone onDrop={handleDrop} getDropOperation={getDropOperation}>
  <DropZoneLabel>Drop files here</DropZoneLabel>
  <FileTrigger onSelect={handleFiles} label="Browse files" />
</DropZone>`,
  "color-picker": `<ColorPicker label="Accent color" value={color} onChange={setColor} />`,
  card: `<Card>
  <CardHeader>
    <CardTitle>Studio North</CardTitle>
    <CardDescription>Team workspace</CardDescription>
  </CardHeader>
  <CardContent>8 members</CardContent>
  <CardFooter>Updated today</CardFooter>
</Card>`,
  avatar: `<AvatarGroup aria-label="Project members">
  <Avatar name="Amina Shah" src="/amina.jpg" />
  <Avatar name="Maya Chen" />
</AvatarGroup>`,
  skeleton: `<output>
  <span className="sr-only">Loading project</span>
  <Skeleton className="h-4 w-40" />
</output>`,
  spinner: `<output className="flex items-center gap-2">
  <Spinner variant="spark" size="sm" decorative />
  Generating response
</output>`,
  "empty-state": `<EmptyState>
  <EmptyStateTitle>No projects yet</EmptyStateTitle>
  <EmptyStateDescription>Create a project to get started.</EmptyStateDescription>
  <EmptyStateActions><a href="/projects/new">Create project</a></EmptyStateActions>
</EmptyState>`,
  pagination: `<Pagination>
  <PaginationList>
    <PaginationItem><PaginationLink href="?page=1" isCurrent>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="?page=2">2</PaginationLink></PaginationItem>
  </PaginationList>
</Pagination>`,
  "description-list": `<DescriptionList>
  <DescriptionTerm>Owner</DescriptionTerm>
  <DescriptionDetail>Amina Shah</DescriptionDetail>
</DescriptionList>`,
  "kbd-code": `<p>Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to find <InlineCode>projects</InlineCode>.</p>`,
  stat: `<Stat>
  <StatLabel>Active projects</StatLabel>
  <StatValue>24</StatValue>
  <StatDetail>Up 3 from last month</StatDetail>
</Stat>`,
  accordion: `<Accordion>
  <AccordionItem id="shipping">
    <AccordionTrigger>Shipping</AccordionTrigger>
    <AccordionContent>Shipping details</AccordionContent>
  </AccordionItem>
</Accordion>`,
  alert: `<Alert variant="success">
  <AlertIcon />
  <div>
    <AlertTitle>Saved</AlertTitle>
    <AlertDescription>Your changes are saved.</AlertDescription>
  </div>
</Alert>`,
  autocomplete: `<Autocomplete>
  <SearchField label="Filter topics" />
  <ListBox aria-label="Topics">
    <ListBoxItem id="design">Design</ListBoxItem>
  </ListBox>
</Autocomplete>`,
  badge: `<Badge variant="success"><BadgeDot /> Published</Badge>`,
  breadcrumbs: `<Breadcrumbs>
  <Breadcrumb href="/components">Components</Breadcrumb>
  <Breadcrumb>Breadcrumbs</Breadcrumb>
</Breadcrumbs>`,
  button: `<Button onPress={handlePress}>Save changes</Button>`,
  calendar: `<Calendar aria-label="Delivery date" />`,
  checkbox: `<Checkbox>
  <CheckboxIndicator />
  <div>
    <CheckboxLabel>Email updates</CheckboxLabel>
    <CheckboxDescription>Get product news.</CheckboxDescription>
  </div>
</Checkbox>`,
  "checkbox-group": `<CheckboxGroup>
  <CheckboxGroupLabel>Notifications</CheckboxGroupLabel>
  <CheckboxGroupDescription>Choose your updates.</CheckboxGroupDescription>
  <CheckboxGroupItems>
    <Checkbox value="product">Product updates</Checkbox>
    <Checkbox value="security">Security alerts</Checkbox>
  </CheckboxGroupItems>
  <CheckboxGroupError />
</CheckboxGroup>`,
  "color-field": `<ColorField label="Accent color" />`,
  "color-swatch": `<ColorSwatch color="#4567d4" colorName="Blue" />`,
  "color-swatch-picker": `<ColorSwatchPicker aria-label="Accent color">
  <ColorSwatchPickerItem color="#4567d4" aria-label="Blue" />
  <ColorSwatchPickerItem color="#af4d65" aria-label="Rose" />
</ColorSwatchPicker>`,
  "combo-box": `<ComboBox>
  <ComboBoxLabel>Framework</ComboBoxLabel>
  <ComboBoxInput placeholder="Search frameworks" />
  <ComboBoxTrigger />
  <ComboBoxContent>
    <ComboBoxItem id="react">React</ComboBoxItem>
  </ComboBoxContent>
</ComboBox>`,
  "date-field": `<DateField label="Delivery date" />`,
  "date-picker": `<DatePicker label="Delivery date" />`,
  "date-range-picker": `<DateRangePicker label="Trip dates" />`,
  dialog: `<Dialog>
  <DialogTrigger>Open details</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Details</DialogTitle>
      <DialogClose aria-label="Close dialog" />
    </DialogHeader>
    <DialogDescription>Project details go here.</DialogDescription>
  </DialogContent>
</Dialog>`,
  drawer: `<Drawer>
  <DrawerTrigger>Review order</DrawerTrigger>
  <DrawerContent snapPoints={[0.4, 0.85]}>
    <DrawerHandle />
    <DrawerHeader>
      <DrawerTitle>Order summary</DrawerTitle>
      <DrawerDescription>Review the items in your order.</DrawerDescription>
      <DrawerClose />
    </DrawerHeader>
    <DrawerBody>Order details</DrawerBody>
    <DrawerFooter><DrawerClose>Done</DrawerClose></DrawerFooter>
  </DrawerContent>
</Drawer>`,
  disclosure: `<Disclosure>
  <DisclosureHeader>What's included?</DisclosureHeader>
  <DisclosurePanel>Details go here.</DisclosurePanel>
</Disclosure>`,
  "file-trigger": `<FileTrigger onSelect={handleFiles} acceptedFileTypes={["image/png"]}>
  <Button>Choose image</Button>
</FileTrigger>`,
  form: `<Form onSubmit={handleSubmit}>
  <TextField name="email" label="Email" type="email" isRequired />
  <Button type="submit">Invite</Button>
</Form>`,
  "grid-list": `<GridList aria-label="Files">
  <GridListItem id="brief" textValue="Brief">Brief</GridListItem>
</GridList>`,
  link: `<Link href="/components">Components</Link>`,
  "list-box": `<ListBox aria-label="Team">
  <ListBoxItem id="design">Design</ListBoxItem>
  <ListBoxItem id="engineering">Engineering</ListBoxItem>
</ListBox>`,
  menu: `<MenuTrigger>
  <Button>Actions</Button>
  <MenuPopover>
    <MenuContent>
      <MenuItem onAction={handleEdit}>Edit</MenuItem>
    </MenuContent>
  </MenuPopover>
</MenuTrigger>`,
  meter: `<Meter label="Storage used" value={60} valueLabel="60%" />`,
  "number-field": `<NumberField label="Guests" defaultValue={2} minValue={1} />`,
  popover: `<DialogTrigger>
  <Button>Details</Button>
  <Popover>
    <Dialog>Project details</Dialog>
  </Popover>
</DialogTrigger>`,
  "preview-trigger": `<PreviewTrigger>
  <Button>Preview</Button>
  <Popover>Preview content</Popover>
</PreviewTrigger>`,
  "progress-bar": `<ProgressBar label="Upload" value={50} />`,
  "radio-group": `<RadioGroup label="Plan" defaultValue="personal">
  <Radio value="personal" label="Personal" />
  <Radio value="team" label="Team" />
</RadioGroup>`,
  "range-calendar": `<RangeCalendar aria-label="Trip dates" />`,
  "search-field": `<SearchField>
  <SearchFieldLabel>Search projects</SearchFieldLabel>
  <SearchFieldInput placeholder="Search" />
  <SearchFieldClear />
</SearchField>`,
  select: `<Select>
  <SelectLabel>Framework</SelectLabel>
  <SelectTrigger />
  <SelectContent>
    <SelectItem id="react">React</SelectItem>
  </SelectContent>
</Select>`,
  separator: `<Separator orientation="horizontal" />`,
  slider: `<Slider label="Volume" defaultValue={50} />`,
  switch: `<Switch>
  <SwitchLabel>Public profile</SwitchLabel>
  <SwitchControl><SwitchThumb /></SwitchControl>
</Switch>`,
  table: `<Table aria-label="Projects">
  <TableHeader><Column isRowHeader>Name</Column></TableHeader>
  <TableBody>
    <Row><Cell>Studio North</Cell></Row>
  </TableBody>
</Table>`,
  tabs: `<Tabs defaultValue="overview">
  <TabsList aria-label="Project sections">
    <TabsTrigger value="overview">Overview</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Project overview</TabsContent>
</Tabs>`,
  "tag-group": `<TagGroup onRemove={handleRemove}>
  <TagGroupLabel>Topics</TagGroupLabel>
  <TagListView items={topics}>
    {(item) => <Tag id={item.id}>{item.name}</Tag>}
  </TagListView>
</TagGroup>`,
  "text-area": `<TextArea name="description">
  <TextAreaLabel>Description</TextAreaLabel>
  <TextAreaInput />
  <TextAreaError />
</TextArea>`,
  "text-field": `<TextField name="projectName">
  <TextFieldLabel>Project name</TextFieldLabel>
  <TextFieldInput />
  <TextFieldError />
</TextField>`,
  "time-field": `<TimeField label="Start time" />`,
  toast: `<Button onPress={() => showToast({ title: "Saved" })}>Save</Button>
<ToastViewport />`,
  "toggle-button": `<ToggleButton isSelected={selected} onChange={setSelected}>Pin</ToggleButton>`,
  "toggle-button-group": `<ToggleButtonGroup selectionMode="single" aria-label="View" disallowEmptySelection>
  <ToggleButton id="day" variant="segmented">Day</ToggleButton>
  <ToggleButton id="week" variant="segmented">Week</ToggleButton>
</ToggleButtonGroup>`,
  toolbar: `<Toolbar aria-label="Formatting">
  <ToggleButtonGroup selectionMode="multiple" aria-label="Text style">
    <ToggleButton id="bold" variant="segmented">Bold</ToggleButton>
    <ToggleButton id="italic" variant="segmented">Italic</ToggleButton>
  </ToggleButtonGroup>
  <Separator orientation="vertical" />
  <Button variant="ghost">Clear</Button>
</Toolbar>`,
  tooltip: `<TooltipTrigger>
  <Button>Save draft</Button>
  <TooltipContent>Save without publishing</TooltipContent>
</TooltipTrigger>`,
};
